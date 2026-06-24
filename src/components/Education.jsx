import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap } from "react-icons/fa";
import { FiBook, FiBriefcase, FiAward } from "react-icons/fi";

const educationData = [
  {
    degree: "B.Tech — Computer Science Engineering (AI & ML)",
    institution: "RR Group of Institutions",
    university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    location: "Lucknow, Uttar Pradesh",
    period: "2023 — Present",
    status: "Pursuing",
    color: "#00d4ff",
    icon: <FaGraduationCap size={28} />,
    highlights: [
      "Specialization in Artificial Intelligence & Machine Learning",
      "Core subjects: DSA, DBMS, OS, Computer Networks, AI",
      "Member of HackLance Technical Club",
      "Actively building MERN & Python projects",
    ],
    courses: ["Machine Learning", "Data Structures", "DBMS", "Computer Networks", "OS", "Python", "Java"],
  },
];

const certHighlights = [
  { icon: <FiBook size={18} />, label: "MERN Stack",    sub: "Self-Paced Learning",    color: "#61dafb" },
  { icon: <FiBriefcase size={18} />, label: "AI & ML", sub: "Python Data Science",    color: "#7c3aed" },
  { icon: <FiAward size={18} />, label: "DSA",         sub: "150+ Problems Solved (GFG & Leetcode)",    color: "#f97316" },
  { icon: <FaGraduationCap size={18} />, label: "AKTU", sub: "Affiliated University", color: "#00ff88" },
];

const Education = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="education"
      style={{ background: "linear-gradient(180deg, rgba(8,6,16,0.96) 0%, rgba(10,8,20,0.97) 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3 font-mono">
            Academic Background
          </p>
          <h2 className="section-heading text-white mb-4">
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
        </div>

        {educationData.map((edu, i) => (
          <motion.div
            key={i}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main education card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-card rounded-3xl overflow-hidden"
              style={{
                border: `1px solid ${edu.color}30`,
                boxShadow: inView ? `0 0 60px ${edu.color}12, 0 0 120px ${edu.color}06` : "none",
              }}
            >
              {/* Top banner */}
              <div
                className="relative p-8 pb-6"
                style={{ background: `linear-gradient(135deg, ${edu.color}12, transparent)` }}
              >
                {/* Animated top border line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: `linear-gradient(to right, transparent, ${edu.color}, #7c3aed, transparent)`,
                    transformOrigin: "left center",
                  }}
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Graduation icon */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${edu.color}25, ${edu.color}08)`,
                      border: `2px solid ${edu.color}40`,
                      color: edu.color,
                      boxShadow: `0 0 30px ${edu.color}30`,
                    }}
                  >
                    {edu.icon}
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold font-mono"
                        style={{ background: `${edu.color}20`, color: edu.color, border: `1px solid ${edu.color}40` }}
                      >
                        {edu.status}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{edu.period}</span>
                    </div>
                    <h3 className="font-space font-black text-xl sm:text-2xl text-white mb-1 leading-tight">
                      {edu.degree}
                    </h3>
                    <p className="font-semibold text-base" style={{ color: edu.color }}>
                      {edu.institution}
                    </p>
                    <p className="text-slate-500 text-sm">{edu.university}</p>
                    <p className="text-slate-600 text-xs mt-1">📍 {edu.location}</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 pt-4 grid sm:grid-cols-2 gap-8">
                {/* Highlights */}
                <div>
                  <h4 className="font-space font-bold text-sm text-slate-300 uppercase tracking-widest mb-4">
                    Highlights
                  </h4>
                  <ul className="space-y-3">
                    {edu.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + j * 0.1 }}
                        className="flex items-start gap-3 text-slate-400 text-sm"
                      >
                        <span style={{ color: edu.color, marginTop: 3 }}>▸</span>
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Courses */}
                <div>
                  <h4 className="font-space font-bold text-sm text-slate-300 uppercase tracking-widest mb-4">
                    Key Courses
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((c, j) => (
                      <motion.span
                        key={c}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6 + j * 0.06 }}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                        style={{
                          background: `${edu.color}10`,
                          color: edu.color,
                          border: `1px solid ${edu.color}25`,
                        }}
                      >
                        {c}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom cert highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {certHighlights.map((item, j) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + j * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="glass-card rounded-2xl p-4 flex flex-col items-center text-center gap-2"
                  style={{ border: `1px solid ${item.color}20` }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                  <p className="font-space font-bold text-sm text-white">{item.label}</p>
                  <p className="text-slate-500 text-xs">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
