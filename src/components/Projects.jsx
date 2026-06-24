import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";
import { projects } from "../data/projects";

/* ─────────────────────────────────────
   3D Tilt Card
───────────────────────────────────── */
const TiltCard = ({ children, color }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt]   = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = e.clientX - cx;
    const dy     = e.clientY - cy;
    const maxRot = 10;
    setTilt({
      x: -(dy / (rect.height / 2)) * maxRot,
      y:  (dx / (rect.width  / 2)) * maxRot,
    });
    setGlare({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease",
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        {/* Glare effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            pointerEvents: "none",
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
            transition: "opacity 0.15s ease",
          }}
        />
        {children}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
   Project Card
───────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className={project.featured ? "lg:col-span-2" : ""}
    >
      <TiltCard color={project.color}>
        <div
          className="glass-card flex flex-col h-full"
          style={{
            border: `1px solid ${hovered ? project.color + "50" : project.color + "20"}`,
            borderRadius: "24px",
            boxShadow: hovered ? `0 20px 60px ${project.color}20, 0 0 30px ${project.color}10` : "none",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Top Banner */}
          <div
            className="relative p-8 flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${project.color}12, ${project.color}05)`,
              minHeight: project.featured ? "200px" : "160px",
              borderBottom: `1px solid ${project.color}20`,
            }}
          >
            {/* Large emoji icon */}
            <motion.div
              animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="text-7xl sm:text-8xl select-none"
              style={{ filter: `drop-shadow(0 0 20px ${project.color}80)` }}
            >
              {project.icon}
            </motion.div>

            {/* Featured badge */}
            {project.featured && (
              <div
                className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
              >
                <FiStar size={11} fill="currentColor" /> Featured
              </div>
            )}

            {/* Category badge */}
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold font-mono"
              style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
            >
              {project.category}
            </div>

            {/* Animated bg glow */}
            <motion.div
              className="absolute inset-0 rounded-t-3xl"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ background: `radial-gradient(circle at center, ${project.color}18, transparent 70%)` }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6 gap-4">
            <div>
              <h3
                className="font-space font-bold text-xl text-white mb-2 transition-colors"
                style={{ color: hovered ? project.color : "#fff" }}
              >
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5">
              {project.features.map((f) => (
                <span
                  key={f}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}20` }}
                >
                  ✓ {f}
                </span>
              ))}
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-badge text-xs">{tag}</span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-auto pt-2">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold glass-card text-slate-300 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                id={`github-btn-${project.id}`}
              >
                <FiGithub size={15} /> GitHub
              </motion.a>
              <motion.a
                href={project.live}
                target={project.live !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${project.color}aa, ${project.color})`, boxShadow: hovered ? `0 4px 20px ${project.color}50` : "none" }}
                id={`demo-btn-${project.id}`}
              >
                <FiExternalLink size={15} /> Live Demo
              </motion.a>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

/* ─────────────────────────────────────
   Main Projects Section
───────────────────────────────────── */
const Projects = () => (
  <section
    id="projects"
    style={{ background: "linear-gradient(180deg, rgba(8,6,15,0.96) 0%, rgba(10,8,20,0.97) 100%)" }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* Heading */}
      <div className="text-center mb-16" data-aos="fade-up">
        <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3 font-mono">
          What I've Built
        </p>
        <h2 className="section-heading text-white mb-4">
          My <span className="gradient-text">Projects</span>
        </h2>
        <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
        <p className="text-slate-400 mt-4 max-w-xl mx-auto">
          Real-world applications built with passion — from intelligent AI tools to full-stack MERN apps.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-14" data-aos="fade-up">
        <motion.a
          href="https://github.com/Nilesh1805"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="btn-outline inline-flex items-center gap-2"
          id="view-all-github-btn"
        >
          <FiGithub size={18} /> View All on GitHub
        </motion.a>
      </div>
    </div>
  </section>
);

export default Projects;
