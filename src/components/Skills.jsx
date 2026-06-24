import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "../data/skills";
import {
  SiHtml5, SiJavascript, SiReact, SiBootstrap, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPython, SiNumpy, SiPandas,
  SiScikitlearn, SiOpenjdk, SiGit, SiGithub, SiMysql,
} from "react-icons/si";
import { FaBrain, FaCss3Alt, FaCode, FaLaptopCode } from "react-icons/fa";

const iconMap = {
  SiHtml5, SiCss3: FaCss3Alt, SiJavascript, SiReact, SiBootstrap, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPython, SiNumpy, SiPandas, SiScikitlearn,
  SiOpenjdk, SiC: FaCode, SiGit, SiGithub, SiVisualstudiocode: FaLaptopCode, SiMysql,
  FaBrain, FaCode,
};

const categories = [
  { key: "frontend",    label: "Frontend",    emoji: "🎨" },
  { key: "backend",     label: "Backend",     emoji: "⚙️" },
  { key: "programming", label: "Programming", emoji: "💻" },
  { key: "aiml",        label: "AI & ML",     emoji: "🤖" },
  { key: "tools",       label: "Tools",       emoji: "🛠️" },
  { key: "dsa",         label: "DSA",         emoji: "🧩" },
];

/* ─────────────────────────────────────
   3D Floating Skill Sphere
───────────────────────────────────── */
const SkillSphere3D = ({ position, color, name, level, index }) => {
  const meshRef   = useRef();
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Pulse glow
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.06;
    targetScale.current = hovered ? 1.5 : pulse;
    meshRef.current.scale.setScalar(
      meshRef.current.scale.x + (targetScale.current - meshRef.current.scale.x) * 0.08
    );
  });

  return (
    <Float speed={1.5 + index * 0.15} rotationIntensity={0.2} floatIntensity={0.8}>
      <group position={position}>
        {/* Core sphere */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.2 : 0.5}
            transparent
            opacity={hovered ? 0.95 : 0.7}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>

        {/* Wire ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.015, 8, 40]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.8}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Skill name label */}
        {hovered && (
          <Text
            position={[0, 0.65, 0]}
            fontSize={0.18}
            color={color}
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gowFU.woff2"
          >
            {name}
          </Text>
        )}
        {hovered && (
          <Text
            position={[0, -0.62, 0]}
            fontSize={0.14}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            {level}%
          </Text>
        )}
      </group>
    </Float>
  );
};

/* ─────────────────────────────────────
   3D Skills Universe Canvas
───────────────────────────────────── */
const SkillsUniverse3D = ({ activeTab }) => {
  const list = skills[activeTab] || [];

  // Arrange spheres in a 3D spiral
  const positions = list.map((_, i) => {
    const angle = (i / list.length) * Math.PI * 4;
    const r     = 1.8 + (i / list.length) * 1.2;
    const y     = -1.5 + (i / (list.length - 1 || 1)) * 3;
    const x     = Math.cos(angle) * r;
    const z     = Math.sin(angle) * r * 0.5 - 1;
    return [x, y, z];
  });

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]}    color="#00d4ff" intensity={2} />
        <pointLight position={[-5, -5, 5]}  color="#7c3aed" intensity={1.5} />
        <pointLight position={[0, 0, -5]}   color="#ec4899" intensity={0.8} />

        {list.map((skill, i) => (
          <SkillSphere3D
            key={skill.name}
            position={positions[i]}
            color={skill.color}
            name={skill.name}
            level={skill.level}
            index={i}
          />
        ))}
      </Suspense>
    </Canvas>
  );
};

/* ─────────────────────────────────────
   Skill Progress Card (2D fallback)
───────────────────────────────────── */
const SkillCard = ({ skill, index }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const Icon = iconMap[skill.icon] || FaCode;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass-card rounded-2xl p-5 group"
      style={{ border: `1px solid ${skill.color}20` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}30` }}
          >
            <Icon size={22} style={{ color: skill.color }} />
          </div>
          <span className="font-semibold text-white text-sm">{skill.name}</span>
        </div>
        <span className="text-xs font-bold" style={{ color: skill.color }}>{skill.level}%</span>
      </div>
      <div className="progress-bar-track">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.07 + 0.3, ease: "easeOut" }}
          style={{ background: `linear-gradient(to right, ${skill.color}80, ${skill.color})` }}
        />
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────
   Main Skills Section
───────────────────────────────────── */
const Skills = () => {
  const [activeTab,   setActiveTab]   = useState("frontend");
  const [viewMode,    setViewMode]    = useState("3d"); // "3d" | "cards"

  return (
    <section
      id="skills"
      style={{ background: "linear-gradient(180deg, rgba(10,8,20,0.95) 0%, rgba(8,6,15,0.97) 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3 font-mono">
            What I Work With
          </p>
          <h2 className="section-heading text-white mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A curated universe of technologies I've mastered through real-world projects and continuous learning.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center gap-3 mb-8" data-aos="fade-up">
          {[
            { key: "3d",    label: "🌐 3D Universe" },
            { key: "cards", label: "📊 Progress View" },
          ].map((m) => (
            <motion.button
              key={m.key}
              onClick={() => setViewMode(m.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={
                viewMode === m.key
                  ? { background: "linear-gradient(135deg, #00d4ff, #7c3aed)", color: "#fff" }
                  : { background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }
              }
              id={`view-${m.key}-btn`}
            >
              {m.label}
            </motion.button>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8" data-aos="fade-up" data-aos-delay="100">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id={`skill-tab-${cat.key}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === cat.key
                  ? "text-white neon-glow-blue"
                  : "glass-card text-slate-400 hover:text-white"
              }`}
              style={activeTab === cat.key ? { background: "linear-gradient(135deg, #00d4ff, #7c3aed)" } : {}}
            >
              <span>{cat.emoji}</span> {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {viewMode === "3d" ? (
              /* 3D Universe */
              <div
                className="w-full rounded-3xl overflow-hidden glass-card relative"
                style={{ height: "420px", border: "1px solid rgba(0,212,255,0.12)" }}
              >
                <SkillsUniverse3D activeTab={activeTab} />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-600 font-mono">
                  Hover over spheres to see skill details
                </div>
              </div>
            ) : (
              /* Cards View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(skills[activeTab] || []).map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Also familiar with */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <p className="text-slate-500 text-sm mb-6 font-mono">Also familiar with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Figma", "Postman", "Firebase", "Flask", "Linux", "REST APIs", "JWT", "Vercel"].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.1, y: -2 }}
                className="tag-badge cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
