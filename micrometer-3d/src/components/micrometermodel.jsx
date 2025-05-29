// MicrometerModel.js
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function MicrometerModel() {
  const thimbleRef = useRef();
  const spindleRef = useRef();

  const thimble = useGLTF("/models/Thimble.glb");
  const frame = useGLTF("/models/U_Frame.glb");
  const spindle = useGLTF("/models/Spindle.glb");
  const sleeve = useGLTF("/models/Ratchet_Stop.glb");
  const mainscalebody = useGLTF("/models/Main_Scale_Body.glb");
  const locknut = useGLTF("/models/Lock_Nut.glb");

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);

  const handlePointerMove = (e) => {
    if (isDragging && spindleRef.current) {
      const delta = e.movementX;
      spindleRef.current.position.x += delta * 0.005; // Adjust movement speed
    }
  };

  return (
    <group scale={[40, 40, 40]} position={[0, 0.5, 0]}>
      <primitive object={mainscalebody.scene} />
      <primitive object={frame.scene} />
      <primitive object={thimble.scene} ref={thimbleRef} />
      <primitive object={sleeve.scene} />
      <primitive object={locknut.scene} />
      <primitive
        object={spindle.scene}
        ref={spindleRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      />
    </group>
  );
}
