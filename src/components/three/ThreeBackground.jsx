import React, { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Slowly drifting star field that leans toward the pointer. */
const Starfield = ({ count = 1400, radius = 26 }) => {
  const points = useRef();

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spherical shell, biased outward so the centre stays readable.
      const r = radius * (0.45 + Math.pow(Math.random(), 0.4) * 0.55);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = r * Math.cos(phi);
      siz[i] = 0.04 + Math.random() * 0.11;
    }
    return [pos, siz];
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.018;
    points.current.rotation.x += delta * 0.006;

    const { x, y } = state.pointer;
    points.current.position.x += (x * 1.6 - points.current.position.x) * 0.03;
    points.current.position.y += (y * 1.0 - points.current.position.y) * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.13}
        sizeAttenuation
        color="#5eb0ff"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/** A wireframe icosahedron that breathes and tumbles. */
const FloatingCore = ({ position, scale, speed, color }) => {
  const mesh = useRef();
  const seed = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed + seed;
    mesh.current.rotation.x = t * 0.35;
    mesh.current.rotation.y = t * 0.22;
    mesh.current.position.y = position[1] + Math.sin(t * 0.8) * 0.5;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.22} />
    </mesh>
  );
};

/** Keeps the scene framed sensibly on narrow viewports. */
const Rig = () => {
  const { camera, size } = useThree();
  const target = size.width < 768 ? 22 : 16;
  useFrame(() => {
    camera.position.z += (target - camera.position.z) * 0.05;
  });
  return null;
};

const ThreeBackground = ({ quality = "high" }) => {
  // Kept deliberately light: fill-rate (dpr) and point count are what cost
  // frames while scrolling, so both stay low even on the "high" tier.
  const count = quality === "low" ? 300 : 750;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 60 }}
        dpr={1}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: false,
        }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <Rig />
          <Starfield count={count} />
          {quality !== "low" && (
            <>
              <FloatingCore position={[-8, 2, -6]} scale={2.4} speed={0.4} color="#38bdf8" />
              <FloatingCore position={[9, -3, -8]} scale={3.2} speed={0.28} color="#22d3ee" />
            </>
          )}
        </Suspense>
      </Canvas>
      {/* Vignette so text always wins over the scene behind it. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.55)_60%,rgba(3,7,18,0.9)_100%)]" />
    </div>
  );
};

export default ThreeBackground;
