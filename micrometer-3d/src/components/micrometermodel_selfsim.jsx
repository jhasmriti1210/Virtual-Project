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

  const originalThimbleX = 0.015;
  const forwardStep = 0.0015;
  const ratchetOffset = 0.045;
  const spindleStartX = -0.04;
  const prismWidth = 0.002;

  const [clickCount, setClickCount] = useState(0);
  const [isSurfaceTouched, setIsSurfaceTouched] = useState(false);
  const [isPrismInserted, setIsPrismInserted] = useState(false);
  const [showPrism, setShowPrism] = useState(false);
  const [, forceRender] = useState(0);

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
    const newX = thimblePos.current - forwardStep;
    const spindleX = spindleStartX + (newX - originalThimbleX);

    if (isSurfaceTouched || newX <= originalThimbleX) return;

    if (prismRef.current && showPrism && isPrismInserted) {
      const prismCenterX = prismRef.current.position.x;
      const prismLeftEdge = prismCenterX - prismWidth / 2;
      if (spindleX <= prismLeftEdge) {
        setIsSurfaceTouched(true);
        return;
      }
    }

    thimblePos.current = newX;
    forceRender((prev) => prev + 1);
  };

  const moveThimbleBackward = () => {
    let newX = thimblePos.current + forwardStep;
    const maxThimbleX = originalThimbleX + 0.025;
    if (newX > maxThimbleX) newX = maxThimbleX;

    thimblePos.current = newX;
    setIsSurfaceTouched(false);
    forceRender((prev) => prev + 1);
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
    getThimblePosition: () => thimblePos.current,
    insertBetweenJaws: () => {
      setIsSurfaceTouched(false);
      setIsPrismInserted(true);
      setShowPrism(true);

      setTimeout(() => {
        if (prismRef.current && anvilRef.current && spindleRef.current) {
          const anvilX = anvilRef.current.position.x;
          const spindleX = spindleRef.current.position.x;
          const offset = 0.021;
          const centerX = (anvilX + spindleX) / 2 - offset;
          const prismY = -0.012;

          prismRef.current.position.set(centerX, prismY, 0);
          console.log("✅ Prism inserted at", centerX, prismY);
        }
      }, 100);
    },
    reset: () => {
      thimblePos.current = originalThimbleX;
      ratchetRotationX.current = 0;
      groupRotationY.current = 0;
      setClickCount(0);
      setIsSurfaceTouched(false);
      setIsPrismInserted(false);
      setShowPrism(false);
      forceRender((prev) => prev + 1);
    },
  }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") moveThimbleForward();
      else if (e.key === "ArrowUp") moveThimbleBackward();
      else if (e.key === "ArrowLeft") rotateRatchetWithSound();
      else if (e.key === "ArrowRight") ref.current?.insertBetweenJaws?.();
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
    if (thimbleRef.current) {
      thimbleRef.current.position.x = thimblePos.current;
    }
    if (ratchetRef.current) {
      ratchetRef.current.position.x = thimblePos.current + ratchetOffset;
      ratchetRef.current.rotation.x = ratchetRotationX.current;
    }
    updateSpindle();
  });

  const frame = useGLTF("/models/U_Frame.glb");
  const anvil = useGLTF("/models/Lock_Nut.glb");
  const spindle = useGLTF("/models/Spindle.glb");
  const sleeve = useGLTF("/models/Main_Scale_Body.glb");
  const thimble = useGLTF("/models/Thimble.glb");
  const ratchet = useGLTF("/models/Ratchet_Stop.glb");
  const prism = useGLTF("/models/prism_rec.glb");

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
      {showPrism && (
        <primitive
          ref={prismRef}
          object={prism.scene}
          scale={[0.0007, 0.0007, 0.0007]}
          rotation={[0, 0, Math.PI / 2]}
        />
      )}
      {props.children}
    </group>
  );
});

export default MicrometerModel;
