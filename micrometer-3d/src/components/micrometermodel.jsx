import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useGLTF, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MicrometerModel = forwardRef((props, ref) => {
  const groupRef = useRef();
  const thimbleRef = useRef();
  const ratchetRef = useRef();
  const spindleRef = useRef();
  const prismRef = useRef();
  const anvilRef = useRef();

  const originalThimbleX = 0.015;
  const forwardStep = 0.0015;
  const ratchetOffset = 0.045;
  const spindleStartX = -0.04;
  const prismWidth = 0.002;

  const [clickCount, setClickCount] = useState(0);
  const [prismClicked, setPrismClicked] = useState(true);
  const [isSurfaceTouched, setIsSurfaceTouched] = useState(false);
  const [isPrismInserted, setIsPrismInserted] = useState(false);
  const [isRatchetTight, setIsRatchetTight] = useState(false);

  const ratchetClickCountRef = useRef(0);
  const thimblePos = useRef(originalThimbleX);
  const ratchetRotationX = useRef(0);
  const rotating = useRef(false);
  const groupRotationY = useRef(0);

  const updateSpindle = () => {
    const spindleX = spindleStartX + (thimblePos.current - originalThimbleX);
    if (spindleRef.current) {
      spindleRef.current.position.x = spindleX;
    }
  };

  const moveThimbleForward = () => {
    if (isSurfaceTouched || thimblePos.current <= originalThimbleX) return;

    let newX = thimblePos.current - forwardStep;
    if (newX <= originalThimbleX) {
      newX = originalThimbleX;
      setIsSurfaceTouched(true);
    }

    const spindleX = spindleStartX + (newX - originalThimbleX);

    if (prismRef.current && prismClicked && isPrismInserted) {
      const prismCenterX = prismRef.current.parent.position.x;
      const prismLeftEdge = prismCenterX - prismWidth / 2;

      if (spindleX <= prismLeftEdge) {
        setIsSurfaceTouched(true);
        return;
      }
    }

    thimblePos.current = newX;
  };

  const moveThimbleBackward = () => {
    let newX = thimblePos.current + forwardStep;
    const maxThimbleX = originalThimbleX + 0.025;
    if (newX > maxThimbleX) newX = maxThimbleX;

    thimblePos.current = newX;
    setIsSurfaceTouched(false);
  };

  const rotateRatchetWithSound = () => {
    if (!ratchetRef.current || rotating.current) return;

    rotating.current = true;
    const audio = new Audio("/models/sound2.mp3");

    ratchetClickCountRef.current += 1;
    setClickCount(ratchetClickCountRef.current);

    if (ratchetClickCountRef.current >= 3) {
      audio.currentTime = 0;
      audio.play();
    }

    if (ratchetClickCountRef.current === 5) {
      setIsRatchetTight(true);
    }

    const startAngle = ratchetRotationX.current;
    const endAngle = startAngle + Math.PI / 2;
    const duration = 300;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      ratchetRotationX.current =
        startAngle + (endAngle - startAngle) * progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        rotating.current = false;
      }
    };

    requestAnimationFrame(animate);
  };

  useImperativeHandle(ref, () => ({
    moveThimbleForward,
    moveThimbleBackward,
    rotateRatchetWithSound,
    insertBetweenJaws: () => {
      setPrismClicked(true);
      setIsSurfaceTouched(false);
      setIsPrismInserted(true);
    },
    getThimblePosition: () => thimblePos.current,
    getSpindleX: () => spindleRef.current?.position.x ?? 0,
    getReading: () => {
      if (isSurfaceTouched && clickCount >= 3 && isPrismInserted) {
        return 55.0;
      }
      return 0.0;
    },
  }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") moveThimbleForward();
      else if (e.key === "ArrowUp") moveThimbleBackward();
      else if (e.key === "ArrowLeft") rotateRatchetWithSound();
      else if (e.key === "ArrowRight") {
        setPrismClicked(true);
        setIsSurfaceTouched(false);
        setIsPrismInserted(true);
      }
    };

    const handleRightClick = (e) => {
      e.preventDefault();
      groupRotationY.current += Math.PI / 6;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleRightClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y = groupRotationY.current;

    thimblePos.current = Math.max(thimblePos.current, originalThimbleX);

    if (thimbleRef.current) {
      thimbleRef.current.position.x = thimblePos.current;
    }

    if (ratchetRef.current) {
      ratchetRef.current.position.x = thimblePos.current + ratchetOffset;
      ratchetRef.current.rotation.x = ratchetRotationX.current;
    }

    updateSpindle();

    if (prismRef.current && prismClicked) {
      if (!isPrismInserted) {
        prismRef.current.parent.position.set(0, 0.2, 0);
      } else {
        const anvilX = anvilRef.current?.position.x ?? 0.007;
        const prismX = anvilX + prismWidth / 2 - 0.042;
        prismRef.current.parent.position.set(prismX, -0.009, -0.005);
      }
    }
  });

  const frame = useGLTF("/models/U_Frame.glb");
  const anvil = useGLTF("/models/Lock_Nut.glb");
  const spindle = useGLTF("/models/Spindle.glb");
  const sleeve = useGLTF("/models/Main_Scale_Body.glb");
  const thimble = useGLTF("/models/Thimble.glb");
  const ratchet = useGLTF("/models/Ratchet_Stop.glb");
  const prism = useGLTF("/models/rectangular_prism.glb");

  return (
    <group ref={groupRef} scale={[40, 40, 40]} position={[-0.6, 0, 0]}>
      <primitive
        object={frame.scene}
        position={[0.01, 0, 0]}
        rotation={[0, Math.PI, 0]}
      />
      <primitive
        ref={anvilRef}
        object={anvil.scene}
        position={[0.007, 0.001, 0]}
      />
      <primitive object={sleeve.scene} position={[0.042, 0, 0]} />
      <primitive
        ref={thimbleRef}
        object={thimble.scene}
        position={[thimblePos.current, 0, 0]}
      />
      <primitive
        ref={ratchetRef}
        object={ratchet.scene}
        position={[thimblePos.current + ratchetOffset, 0, 0]}
      />
      <primitive
        ref={spindleRef}
        object={spindle.scene}
        position={[spindleStartX, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {prismClicked && (
        <mesh>
          <primitive
            ref={prismRef}
            object={prism.scene}
            scale={[0.5, 0.5, 0.5]}
            rotation={[0, 0, Math.PI / 2]}
          />
        </mesh>
      )}

      {isPrismInserted && isSurfaceTouched && clickCount < 3 && (
        <Text
          position={[
            (spindleRef.current?.position.x ?? -0.04) + 0.03,
            0.025,
            0,
          ]}
          fontSize={0.003}
          color="red"
          anchorX="center"
          anchorY="middle"
        >
          Spindle Successfully touched the 3D Rectangular Pieces! Now do Next
          Step.
        </Text>
      )}

      {isPrismInserted && isSurfaceTouched && clickCount >= 3 && (
        <>
          <>
            {/* Background box behind text */}
            <mesh position={[0.025, 0.06, -0.001]}>
              <planeGeometry args={[0.15, 0.02]} />
              <meshBasicMaterial color="white" opacity={0.9} transparent />
            </mesh>

            {/* Foreground text */}
            <Text
              position={[0.025, 0.06, 0]}
              fontSize={0.005}
              color="green"
              anchorX="center"
              anchorY="middle"
            >
              Ratchet tightened! Proceed to take the reading.
            </Text>
          </>

          <Text position={[0.025, 0.036, 0]} fontSize={0.0035} color="black">
            Thimble (28 divisions)
          </Text>

          <Text
            position={[0.025, 0.033, 0]}
            fontSize={0.003}
            color="black"
            anchorX="center"
            anchorY="top"
          >
            The aligned thimble line is the 28th division
          </Text>

          <mesh>
            <tubeGeometry
              args={[
                new THREE.CatmullRomCurve3([
                  new THREE.Vector3(0.03, 0.03, 0),
                  new THREE.Vector3(0.035, 0.027, 0),
                  new THREE.Vector3(0.025, 0.02, 0),
                ]),
                20,
                0.0004,
                8,
                false,
              ]}
            />
            <meshStandardMaterial color="black" />
          </mesh>

          <mesh position={[0.025, 0.02, 0]}>
            <coneGeometry args={[0.002, 0.004, 8]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="black" />
          </mesh>

          <mesh position={[0.025, 0.015, 0]}>
            <cylinderGeometry args={[0.0002, 0.0002, 0.015, 8]} />
            <meshStandardMaterial color="black" />
          </mesh>

          <Text position={[0.019, -0.03, 0]} fontSize={0.002} color="black">
            Main Scale (5 mm)
          </Text>

          <mesh position={[0.02, -0.02, 0]}>
            <cylinderGeometry args={[0.0002, 0.0002, 0.015, 8]} />
            <meshStandardMaterial color="black" />
          </mesh>

          <mesh position={[0.02, -0.013, 0]}>
            <coneGeometry
              args={[0.0016, 0.004, 8]}
              rotation={[Math.PI, 0, 0]}
            />
            <meshStandardMaterial color="black" />
          </mesh>
        </>
      )}

      {props.children}
    </group>
  );
});

export default MicrometerModel;
