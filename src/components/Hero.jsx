import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Torus, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FiArrowDown, FiDownload, FiMail } from "react-icons/fi";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import gsap from "gsap";

/* ─────────────────────────────────────
   3D Holographic Avatar Scene
───────────────────────────────────── */
const HoloCoreOrb = () => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00d4ff"
          distort={0.45}
          speed={2.5}
          transparent
          opacity={0.25}
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          wireframe={false}
        />
      </Sphere>
    </Float>
  );
};

const RotatingRing = ({ radius, color, speed, axis = "y", tilt = 0 }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    if (axis === "y") ref.current.rotation.y += delta * speed;
    if (axis === "x") ref.current.rotation.x += delta * speed;
    if (axis === "z") ref.current.rotation.z += delta * speed;
  });

  return (
    <Torus
      ref={ref}
      args={[radius, 0.04, 8, 80]}
      rotation={[tilt, 0, 0]}
    >
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        transparent
        opacity={0.7}
      />
    </Torus>
  );
};

const HoloParticles = () => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const points = Array.from({ length: 60 }, (_, i) => {
    const phi   = Math.acos(-1 + (2 * i) / 60);
    const theta = Math.sqrt(60 * Math.PI) * phi;
    const r = 2.2 + Math.sin(i * 0.5) * 0.15;
    return [
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
    ];
  });

  return (
    <group ref={ref}>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#7c3aed" : "#ec4899"}
            emissive={i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#7c3aed" : "#ec4899"}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const AvatarScene = ({ mousePos }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current && mousePos) {
      groupRef.current.rotation.y += (mousePos.current.x * 0.4 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-mousePos.current.y * 0.2 - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]}   color="#00d4ff" intensity={3} />
      <pointLight position={[-5, -5, 5]} color="#7c3aed" intensity={2} />
      <pointLight position={[0, 5, -5]}  color="#ec4899" intensity={1} />

      <HoloCoreOrb />
      <HoloParticles />

      <RotatingRing radius={1.8} color="#00d4ff" speed={0.8} axis="y" tilt={0}               />
      <RotatingRing radius={1.8} color="#7c3aed" speed={0.6} axis="x" tilt={Math.PI / 2}     />
      <RotatingRing radius={2.4} color="#ec4899" speed={0.4} axis="y" tilt={Math.PI / 4}     />
      <RotatingRing radius={2.4} color="#00ff88" speed={0.3} axis="z" tilt={Math.PI / 3}     />
    </group>
  );
};

/* ─────────────────────────────────────
   Hero Section
───────────────────────────────────── */
const Hero = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const heroRef  = useRef(null);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  // Mouse tracking for 3D interaction
  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = {
        x:  (e.clientX / window.innerWidth  - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // GSAP stagger entrance
  useEffect(() => {
    if (!heroRef.current) return;
    const els = heroRef.current.querySelectorAll(".gsap-hero-item");
    gsap.fromTo(
      els,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Floating decorative shapes */}
      {[
        { w: 300, h: 300, bg: "radial-gradient(circle, rgba(0,212,255,0.1), transparent)", top: "8%",  left: "3%",  delay: 0 },
        { w: 200, h: 200, bg: "radial-gradient(circle, rgba(124,58,237,0.1), transparent)", bottom: "12%", right: "5%", delay: 2 },
        { w: 150, h: 150, bg: "radial-gradient(circle, rgba(236,72,153,0.07), transparent)", top: "55%", left: "8%",  delay: 4 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: s.w, height: s.h, background: s.bg, top: s.top, bottom: s.bottom, left: s.left, right: s.right }}
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}

      {/* Cyber grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* ── LEFT: Text Content ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Status badge */}
            <div className="gsap-hero-item opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
              style={{ border: "1px solid rgba(0,212,255,0.35)" }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-slate-300 font-mono">Available for Internships</span>
            </div>

            {/* Greeting */}
            <p className="gsap-hero-item opacity-0 text-lg text-slate-400 mb-2 font-medium">
              👋 Hello World, I'm
            </p>

            {/* Name */}
            <h1 className="gsap-hero-item opacity-0 section-heading text-white mb-3 leading-tight">
              Nilesh{" "}
              <span className="gradient-text">Rajbhar</span>
            </h1>

            {/* Tagline */}
            <p className="gsap-hero-item opacity-0 text-slate-400 text-sm font-mono tracking-widest uppercase mb-4">
              Full Stack Developer &nbsp;·&nbsp; AI &amp; ML Enthusiast &nbsp;·&nbsp; Problem Solver
            </p>

            {/* Typewriter */}
            <div
              className="gsap-hero-item opacity-0 text-xl sm:text-2xl font-space font-semibold mb-6 flex items-center gap-2 justify-center lg:justify-start"
              style={{ color: "#00d4ff", minHeight: "2.2rem" }}
            >
              <span style={{ color: "rgba(0,212,255,0.5)" }}>&lt;</span>
              <Typewriter
                options={{
                  strings: [
                    "MERN Stack Developer",
                    "AIML Student",
                    "React Developer",
                    "Open Source Learner",
                    "Java Programmer",
                    "DSA Problem Solver",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 55,
                  deleteSpeed: 28,
                }}
              />
              <span style={{ color: "rgba(0,212,255,0.5)" }}>/&gt;</span>
            </div>

            {/* Description */}
            <p className="gsap-hero-item opacity-0 text-slate-400 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              B.Tech CSE (AI&ML) student at RR Group of Institutions, Lucknow.
              Passionate about building intelligent web apps and solving real-world problems through technology.
            </p>

            {/* CTA Buttons */}
            <div className="gsap-hero-item opacity-0 flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <motion.a
                href="https://drive.google.com/file/d/1ghbNJxogekyeEqbiyitWIBgvh40wOIsf/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2"
                id="download-resume-btn"
              >
                <FiDownload size={16} /> Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center gap-2"
                id="contact-me-btn"
              >
                <FiMail size={16} /> Contact Me
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="gsap-hero-item opacity-0 flex gap-4 justify-center lg:justify-start">
              {[
                { icon: <FiGithub size={20} />, href: "https://github.com/Nilesh1805", label: "GitHub" },
                { icon: <FiLinkedin size={20} />, href: "https://www.linkedin.com/in/nilesh-rajbhar-483371274/", label: "LinkedIn" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
                  style={{ border: "1px solid rgba(0,212,255,0.25)" }}
                  aria-label={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: 3D Holographic Avatar ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="flex-shrink-0 relative w-72 h-72 sm:w-96 sm:h-96"
          >
            {/* Outer glow ring decorations */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)", transform: "scale(1.4)" }}
            />

            {/* Three.js Canvas */}
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              style={{ width: "100%", height: "100%" }}
            >
              <Suspense fallback={null}>
                <AvatarScene mousePos={mousePos} />
              </Suspense>
            </Canvas>

            {/* Floating tech badges */}
            {[
              { label: "React.js", color: "#61dafb", pos: "left-0 top-[20%]"  },
              { label: "AI/ML",    color: "#00ff88", pos: "right-0 top-[20%]" },
              { label: "Python",   color: "#3776ab", pos: "left-0 bottom-[20%]"  },
              { label: "Node.js",  color: "#3c873a", pos: "right-0 bottom-[20%]" },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className={`absolute ${badge.pos} glass-card px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap`}
                style={{ border: `1px solid ${badge.color}40`, color: badge.color, boxShadow: `0 0 10px ${badge.color}30` }}
              >
                {badge.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToAbout}
        >
          <span className="text-xs text-slate-500 font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FiArrowDown className="text-cyan-400" size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
