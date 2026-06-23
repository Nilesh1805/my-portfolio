import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";
import { projects } from "../data/projects";

const projectImages = {
  1: "/project1.png",
  2: "/project2.png",
  3: "/project3.png",
  4: "/project4.png",
};

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8 }}
      className={`glass-card rounded-3xl overflow-hidden flex flex-col group ${
        project.featured ? "lg:col-span-2" : ""
      }`}
      style={{ border: `1px solid ${project.color}20` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: project.featured ? "260px" : "200px" }}>
        <img
          src={projectImages[project.id]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to bottom, transparent 30%, rgba(2,8,24,0.95) 100%)`,
          }}
        />
        {/* Color tint on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 0.15 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: project.color }}
        />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
            <FiStar size={12} fill="currentColor" /> Featured Project
          </div>
        )}

        {/* Number */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
          style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-space font-bold text-xl text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.features.map((f) => (
            <span key={f} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}20` }}>
              ✓ {f}
            </span>
          ))}
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-badge text-xs">{tag}</span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold glass-card text-slate-300 hover:text-white transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            id={`github-btn-project-${project.id}`}
          >
            <FiGithub size={16} /> GitHub
          </motion.a>
          <motion.a
            href={project.live}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${project.color}80, ${project.color})` }}
            id={`demo-btn-project-${project.id}`}
          >
            <FiExternalLink size={16} /> Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.94) 0%, rgba(12,12,12,0.96) 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">What I've Built</p>
          <h2 className="section-heading text-white mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Real-world applications built with passion — from intelligent AI tools to full-stack MERN apps.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          data-aos="fade-up"
          className="text-center mt-14"
        >
          <a
            href="https://github.com/Nilesh1805"
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-github-btn"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline flex items-center gap-2 mx-auto"
            >
              <FiGithub size={18} /> View All on GitHub
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
