import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiCode } from "react-icons/fi";
import { FaBrain, FaReact, FaGraduationCap } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const aboutStats = [
  { value: 4, suffix: "+", label: "Projects Built" },
  { value: 15, suffix: "+", label: "Technologies" },
  { value: 150, suffix: "+", label: "DSA Problems" },
  { value: 2, suffix: "+ Yrs", label: "Learning" },
];

const highlights = [
  { icon: <FaGraduationCap size={20} />, text: "B.Tech CSE (AI & ML) — RR Group of Institutions", color: "#00d4ff" },
  { icon: <FaReact size={20} />, text: "MERN Stack Developer — React, Node, MongoDB", color: "#61dafb" },
  { icon: <FaBrain size={20} />, text: "AI/ML with Python, Scikit-Learn & NumPy", color: "#7c3aed" },
  { icon: <FiCode size={20} />, text: "Competitive Programming — Java, C, Python", color: "#00ff88" },
  { icon: <FiMapPin size={20} />, text: "Based in Lucknow, India", color: "#ec4899" },
  { icon: <FiMail size={20} />, text: "Open to Internships & Opportunities", color: "#f97316" },
];

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="about" className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.93) 0%, rgba(14,14,14,0.95) 100%)" }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Heading */}
        <motion.div
          data-aos="fade-up"
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">Get To Know Me</p>
          <h2 className="section-heading text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Photo + Tech Stack Visual */}
          <motion.div
            data-aos="fade-right"
            className="relative flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Rotating border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-8px] rounded-3xl"
                style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed, #ec4899, #00d4ff)", padding: 2, borderRadius: 24 }}
              >
                <div className="w-full h-full rounded-3xl" style={{ background: "#060f1e" }} />
              </motion.div>

              <div className="relative glass-card rounded-3xl overflow-hidden w-full h-full">
                <img
                  src="/profile.jpg"
                  alt="Nilesh Rajbhar"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.05) 0%, transparent 100%)" }} />
              </div>

              {/* Floating badge: Status */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 glass-card rounded-2xl p-3 neon-glow-blue"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-semibold text-green-400">Open to Work</span>
                </div>
              </motion.div>

              {/* Floating badge: Role */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -top-4 -left-4 glass-card rounded-2xl p-3 neon-glow-purple"
              >
                <span className="text-xs font-semibold gradient-text">CSE AI & ML 🎓</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text + Highlights */}
          <motion.div data-aos="fade-left" className="space-y-6">
            <div>
              <h3 className="font-space font-bold text-2xl text-white mb-4">
                Crafting Digital Experiences with{" "}
                <span className="gradient-text">AI & Code</span>
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                I am <strong className="text-white">Nilesh Rajbhar</strong>, a B.Tech Computer Science Engineering
                (AI &amp; ML) student at <strong className="text-cyan-400">RR Group of Institutions, Lucknow</strong>.
                My interests include Full-Stack Development, Artificial Intelligence, Machine Learning,
                and Data Structures &amp; Algorithms.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                I enjoy solving programming challenges using <strong className="text-orange-400">Java</strong>,
                building scalable web applications with the <strong className="text-cyan-400">MERN stack</strong>,
                and continuously improving my technical skills through coding platforms and real-world projects.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                Active member of <strong className="text-cyan-400">HackLance Technical Club</strong> at RR Group of Institutions.
                Passionate about software development, artificial intelligence, and solving real-world problems through technology.
                Regularly practice on <strong className="text-yellow-400">LeetCode</strong> &amp; <strong className="text-green-400">GeeksforGeeks</strong> to sharpen DSA skills.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="glass-card rounded-xl p-3 flex items-center gap-3"
                  style={{ border: `1px solid ${item.color}20` }}
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span className="text-sm text-slate-300">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
          {aboutStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card rounded-2xl p-6 text-center neon-glow-blue"
            >
              <div className="gradient-text font-space font-bold text-3xl sm:text-4xl mb-1">
                {inView ? (
                  <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                ) : `0${stat.suffix}`}
              </div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
