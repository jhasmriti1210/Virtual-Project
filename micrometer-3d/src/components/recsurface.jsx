import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

const RectPiece = forwardRef(({ position = [100, 100, 100], onClick }, ref) => {
  const meshRef = useRef();
  const [inserted, setInserted] = useState(false);

  useImperativeHandle(ref, () => ({
    insertBetweenJaws: (
      spindleX = 0.033,
      anvilX = 0.007,
      spindleY = 0,
      anvilY = 0
    ) => {
      const centerX = (spindleX + anvilX) / 2;
      const centerY = (spindleY + anvilY) / 2;
      const centerZ = 0;
      meshRef.current.position.set(centerX, centerY, centerZ);
      setInserted(true);
    },
  }));

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
      receiveShadow
      onClick={onClick}
      visible={true}
    >
      <boxGeometry args={[0.007, 0.06, 0.034]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
});

export default RectPiece;
