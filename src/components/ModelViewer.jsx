import React, { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

const Model = ({ onLoaded }) => {
  const gltf = useGLTF("/models/avtar.glb");

  const [spring, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    position: [0, -1.5, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  const { gl } = useThree();

  useEffect(() => {
    const handleClick = () => {
      api.start({
        rotation: [0, 0, 0],
        position: [0, -1.5, 0],
      });
    };
    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [gl, api]);

  useEffect(() => {
    if (gltf && onLoaded) onLoaded();
  }, [gltf, onLoaded]);

  return (
    <a.group rotation={spring.rotation} position={spring.position}>
      <primitive object={gltf.scene} scale={1.5} />
    </a.group>
  );
};

const ModelViewer = ({ onLoaded }) => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={null}>
        <Model onLoaded={onLoaded} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default ModelViewer;
