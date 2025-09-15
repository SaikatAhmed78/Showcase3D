import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";

const HeroCamera = ({ children, isMobile }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Camera smooth positioning
    easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta);

    // Group rotation when not on mobile
    if (!isMobile && groupRef.current) {
      easing.dampE(
        groupRef.current.rotation,
        [-state.pointer.y / 3, state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return (
    <group ref={groupRef}>{children}</group>
  )
};

export default HeroCamera;
