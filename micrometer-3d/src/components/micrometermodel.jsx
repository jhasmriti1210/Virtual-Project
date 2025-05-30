import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function MicrometerModel() {
  const thimbleRef = useRef();

  const [dragging, setDragging] = useState({
    thimble: false,
  });

  const thimblePos = useRef(0.042);
  const thimbleRot = useRef(0);

  const onThimblePointerDown = (e) => {
    e.stopPropagation();
    setDragging((d) => ({ ...d, thimble: true }));
  };
  const onThimblePointerUp = (e) => {
    e.stopPropagation();
    setDragging((d) => ({ ...d, thimble: false }));
  };
  const onThimblePointerMove = (e) => {
    if (dragging.thimble && thimbleRef.current) {
      e.stopPropagation();

      let delta = Math.min(0, e.movementX * 0.002);
      let newX = thimblePos.current + delta;

      if (newX < 0.03) newX = 0.03;
      if (newX > 0.042) newX = 0.042;

      thimblePos.current = newX;
      thimbleRef.current.position.x = newX;

      let rot = thimbleRef.current.rotation.z + e.movementX * 0.01;
      thimbleRot.current = rot;
      thimbleRef.current.rotation.z = rot;
    }
  };

  const frame = useGLTF("/models/U_Frame.glb");
  const anvil = useGLTF("/models/Lock_Nut.glb");
  const spindle = useGLTF("/models/Spindle.glb");
  const sleeve = useGLTF("/models/Main_Scale_Body.glb");
  const thimble = useGLTF("/models/Thimble.glb");
  const ratchet = useGLTF("/models/Ratchet_Stop.glb");

  return (
    <group scale={[50, 50, 50]} position={[-1, 0, 0]}>
      {/* Static parts */}
      <primitive
        object={frame.scene}
        position={[0.01, 0, 0]}
        rotation={[0, Math.PI, 0]}
      />
      <primitive object={anvil.scene} position={[0.0065, -0.0062, 0]} />
      <primitive object={sleeve.scene} position={[0.042, 0, 0]} />

      <primitive object={ratchet.scene} position={[0.088, 0, 0]} />

      {/* Movable thimble only */}
      <primitive
        object={thimble.scene}
        ref={thimbleRef}
        position={[thimblePos.current, 0, 0]}
        rotation-z={thimbleRot.current}
        // onPointerDown={onThimblePointerDown}
        // onPointerUp={onThimblePointerUp}
        // onPointerMove={onThimblePointerMove}
        // castShadow
        // receiveShadow
      />

      <primitive
        object={spindle.scene}
        position={[0.03, 0, 0]}
        rotation={[0, 0, Math.PI]}
      />
    </group>
  );
}
