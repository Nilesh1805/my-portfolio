import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "../data/skills";
import {
  SiHtml5, SiJavascript, SiReact, SiBootstrap, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPython, SiNumpy, SiPandas, SiScikitlearn, SiOpenjdk
} from "react-icons/si";
import { FaCode, FaCss3Alt } from "react-icons/fa";

const iconMap = {
  SiHtml5, SiCss3: FaCss3Alt, SiJavascript, SiReact, SiBootstrap, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPython, SiNumpy, SiPandas, SiScikitlearn, SiOpenjdk,
  SiC: FaCode,
  FaCode,
};

const categories = [
  { key: "frontend", label: "Frontend", emoji: "🎨" },
  { key: "backend", label: "Backend", emoji: "⚙️" },
  { key: "programming", label: "Programming", emoji: "💻" },
  { key: "aiml", label: "AI & ML", emoji: "🤖" },
];

const SkillCard = ({ skill, index }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const IconComponent = iconMap[skill.icon] || FaCode;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass-card rounded-2xl p-5 group"
      style={{ border: `1px solid ${skill.color}20` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}30` }}>
            <IconComponent size={22} style={{ color: skill.color }} />
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
          transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: "easeOut" }}
          style={{ background: `linear-gradient(to right, ${skill.color}80, ${skill.color})` }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <section id="skills" style={{ background: "linear-gradient(180deg, rgba(12,12,12,0.94) 0%, rgba(8,8,8,0.96) 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">What I Work With</p>
          <h2 className="section-heading text-white mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A curated collection of technologies and tools I've mastered through real-world projects and continuous learning.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up" data-aos-delay="100">
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
              style={activeTab === cat.key
                ? { background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }
                : {}}
            >
              <span>{cat.emoji}</span> {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skills[activeTab]?.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>

        {/* Tech Stack Icons Banner */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <p className="text-slate-500 text-sm mb-6">Also familiar with</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Git", "GitHub", "VS Code", "Figma", "Postman", "Firebase", "Flask", "Linux"].map((tech) => (
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
