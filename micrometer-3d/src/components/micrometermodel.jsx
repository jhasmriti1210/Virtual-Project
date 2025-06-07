import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const MicrometerModel = forwardRef((props, ref) => {
  const groupRef = useRef();
  const thimbleRef = useRef();
  const ratchetRef = useRef();
  const spindleRef = useRef();
  const prismRef = useRef();
  const anvilRef = useRef();

  const originalThimbleX = 0.042;
  const forwardStep = 0.0015;
  const ratchetOffset = 0.045;
  const spindleStartX = -0.04;
  const minThimbleX = 0.012;

  const [clickCount, setClickCount] = useState(0);
  const [prismClicked, setPrismClicked] = useState(false);

  const thimblePos = useRef(originalThimbleX);
  const ratchetRotationZ = useRef(0);
  const rotating = useRef(false);
  const groupRotationY = useRef(0);

  const updateSpindle = () => {
    const movement = originalThimbleX - thimblePos.current;
    const spindleX = spindleStartX + movement;
    if (spindleRef.current) {
      spindleRef.current.position.x = spindleX;
    }
  };

  const moveThimbleForward = () => {
    let newX = thimblePos.current + forwardStep;
    if (newX > originalThimbleX) newX = originalThimbleX;
    if (newX === thimblePos.current) return;
    thimblePos.current = newX;
  };

  const moveThimbleBackward = () => {
    let newX = thimblePos.current - forwardStep;
    const movement = originalThimbleX - newX;
    const spindleX = spindleStartX + movement;

    if (prismRef.current && prismClicked) {
      const prismCenterX = prismRef.current.parent.position.x;
      const prismWidth = 0.002;
      const prismLeftEdge = prismCenterX - prismWidth / 2;

      if (spindleX >= prismLeftEdge) return; // ❌ Stop before touching
    }

    if (newX < minThimbleX) newX = minThimbleX;
    if (newX === thimblePos.current) return;

    thimblePos.current = newX;
  };

  const rotateRatchetWithSound = () => {
    if (!ratchetRef.current || rotating.current) return;

    rotating.current = true;
    const audio = new Audio("/models/sound2.mp3");

    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        audio.currentTime = 0;
        audio.play();
      }
      return newCount;
    });

    const startAngle = ratchetRotationZ.current;
    const endAngle = startAngle + Math.PI / 2;
    const duration = 300;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      ratchetRotationZ.current =
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
    insertBetweenJaws: () => setPrismClicked(true),
    getThimblePosition: () => thimblePos.current,
    getSpindleX: () => spindleRef.current?.position.x ?? 0,
  }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") moveThimbleForward();
      else if (e.key === "ArrowDown") moveThimbleBackward();
      else if (e.key === "ArrowLeft") rotateRatchetWithSound();
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
    if (thimbleRef.current) thimbleRef.current.position.x = thimblePos.current;
    if (ratchetRef.current) {
      ratchetRef.current.position.x = thimblePos.current + ratchetOffset;
      ratchetRef.current.rotation.z = ratchetRotationZ.current;
    }
    updateSpindle();

    if (prismRef.current && prismClicked) {
      const prismWidth = 0.002;
      const anvilX = anvilRef.current?.position.x ?? 0.007;
      const prismX = anvilX + prismWidth / 2 - 0.042;

      prismRef.current.parent.position.set(prismX, -0.009, -0.005);
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
    <group ref={groupRef} scale={[50, 50, 50]} position={[-1, 0, 0]}>
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
      <primitive object={sleeve.scene} position={[originalThimbleX, 0, 0]} />
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

      {/* Rectangular test piece */}
      <mesh position={[-0.15, 0.25, 0]} onClick={() => setPrismClicked(true)}>
        <primitive
          ref={prismRef}
          object={prism.scene}
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, 0, Math.PI / 2]}
        />
      </mesh>

      {props.children}
    </group>
  );
});

export default MicrometerModel;
