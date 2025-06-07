import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MicrometerModel from "./micrometermodel";

const MicrometerCanvas = forwardRef((props, ref) => {
  const modelRef = useRef();
  const [controlsEnabled, setControlsEnabled] = useState(true);

  useImperativeHandle(ref, () => ({
    moveThimbleForward: () => modelRef.current?.moveThimbleBackward(),
    moveThimbleBackward: () => modelRef.current?.moveThimbleForward(),
    rotateRatchetWithSound: () => modelRef.current?.rotateRatchetWithSound(),
    getThimblePosition: () => modelRef.current?.getThimblePosition?.(),
    insertBetweenJaws: () => modelRef.current?.insertBetweenJaws?.(),
  }));

  return (
    <div style={{ height: "100%", width: "100%", background: "#fff" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[10, 10, 10]} />

        <MicrometerModel ref={modelRef}>{props.children}</MicrometerModel>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enabled={controlsEnabled}
        />
      </Canvas>
    </div>
  );
});

export default MicrometerCanvas;
