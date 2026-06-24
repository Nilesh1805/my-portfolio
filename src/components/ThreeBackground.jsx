import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
// import * as THREE from "three";

/* ─────────────────────────────────────
   Star Field — 5000 random points
───────────────────────────────────── */
const StarField = () => {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.015;
      ref.current.rotation.y -= delta * 0.008;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#88ccff"
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
};

/* ─────────────────────────────────────
   Floating Geometric Shapes
───────────────────────────────────── */
const FloatingShape = ({ position, rotation, color, speed = 1, shape = "ico" }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3 * speed;
      ref.current.rotation.y += delta * 0.2 * speed;
      ref.current.rotation.z += delta * 0.1 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={ref} position={position} rotation={rotation}>
        {shape === "ico" && <icosahedronGeometry args={[0.8, 0]} />}
        {shape === "torus" && <torusGeometry args={[0.8, 0.2, 12, 40]} />}
        {shape === "box"   && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {shape === "oct"   && <octahedronGeometry args={[0.9, 0]} />}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.25}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
};

/* ─────────────────────────────────────
   Mouse-reactive camera drift
───────────────────────────────────── */
const CameraRig = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.current.y * 1.0 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

/* ─────────────────────────────────────
   Neon Glow Orb
───────────────────────────────────── */
const GlowOrb = ({ position, color }) => (
  <Float speed={1.5} floatIntensity={2} rotationIntensity={0}>
    <Sphere args={[0.6, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        distort={0.4}
        speed={2}
        transparent
        opacity={0.18}
        emissive={color}
        emissiveIntensity={0.6}
      />
    </Sphere>
  </Float>
);

/* ─────────────────────────────────────
   Scene Content
───────────────────────────────────── */
const SceneContent = () => (
  <>
    <CameraRig />
    <ambientLight intensity={0.1} />
    <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={0.8} />
    <pointLight position={[-10, -10, -5]} color="#7c3aed" intensity={0.6} />
    <pointLight position={[0, 10, -10]} color="#ec4899" intensity={0.3} />

    <StarField />

    <FloatingShape position={[-6, 2, -8]}  rotation={[0.5, 0, 0]}   color="#00d4ff" speed={0.7} shape="ico" />
    <FloatingShape position={[6, -2, -10]} rotation={[0, 0.5, 0]}   color="#7c3aed" speed={0.5} shape="torus" />
    <FloatingShape position={[-4, -4, -6]} rotation={[0.3, 0.3, 0]} color="#ec4899" speed={0.9} shape="oct" />
    <FloatingShape position={[5, 4, -9]}   rotation={[0, 0.2, 0.5]} color="#00ff88" speed={0.6} shape="box" />
    <FloatingShape position={[0, -5, -12]} rotation={[0.7, 0, 0]}   color="#00d4ff" speed={0.4} shape="ico" />
    <FloatingShape position={[-7, 5, -11]} rotation={[0, 0.8, 0]}   color="#7c3aed" speed={0.8} shape="torus" />

    <GlowOrb position={[-8, 3, -15]}  color="#00d4ff" />
    <GlowOrb position={[8, -3, -15]}  color="#7c3aed" />
    <GlowOrb position={[0, 6, -20]}   color="#ec4899" />
  </>
);

/* ─────────────────────────────────────
   Main Component — exported
───────────────────────────────────── */
const ThreeBackground = () => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
    }}
  >
    <Canvas
      camera={{ position: [0, 0, 1], fov: 75 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
    >
      <React.Suspense fallback={null}>
        <SceneContent />
      </React.Suspense>
    </Canvas>
  </div>
);

export default ThreeBackground;
