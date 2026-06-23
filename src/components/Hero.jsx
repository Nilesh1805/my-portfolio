import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";

const FloatingShape = ({ style }) => (
  <motion.div
    className="absolute rounded-full opacity-20"
    style={style}
    animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
);



const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "transparent" }}>

      {/* Particle Dots — removed, replaced by global AnimatedBackground */}

      {/* Floating Decorative Shapes (kept for depth layering) */}
      <FloatingShape
        style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(0,212,255,0.12), transparent)", top: "10%", left: "5%", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
      />
      <FloatingShape
        style={{ width: 200, height: 200, background: "radial-gradient(circle, rgba(124,58,237,0.12), transparent)", bottom: "15%", right: "8%", animationDelay: "2s" }}
      />
      <FloatingShape
        style={{ width: 150, height: 150, background: "radial-gradient(circle, rgba(236,72,153,0.08), transparent)", top: "60%", left: "10%", animationDelay: "4s" }}
      />

      {/* Grid lines overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
              style={{ border: "1px solid rgba(0,212,255,0.3)" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-slate-300">Available for Internships</span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-400 mb-2 font-medium"
            >
              👋 Hello World, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="section-heading text-white mb-4 leading-tight"
            >
              Nilesh{" "}
              <span className="gradient-text">Rajbhar</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl font-space font-semibold mb-6 flex items-center gap-2 justify-center lg:justify-start"
              style={{ color: "#00d4ff", minHeight: "2rem" }}
            >
              {/* <span>&lt;</span> */}
              <Typewriter
                options={{
                  strings: [
                    "MERN Stack Developer",
                    "AIML Enthusiast",
                    "Java Programmer",
                    "DSA Problem Solver",
                    "Competitive Programmer",
                    "Software Engineer Aspirant",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 30,
                }}
              />
              {/* <span>/&gt;</span> */}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              B.Tech CSE (AI & ML) student at RR Group of Institutions, Lucknow.
              Passionate about building intelligent web applications and solving real-world problems
              through technology. Seeking internship opportunities.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2"
                id="view-projects-btn"
              >
                View Projects
              </motion.a>
              <motion.a
                href="https://drive.google.com/file/d/1ghbNJxogekyeEqbiyitWIBgvh40wOIsf/view?usp=drive_link"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center gap-2"
                id="download-resume-btn"
                target="_blank"
              >
                <FiDownload size={16} /> Download CV
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
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
                  style={{ border: "1px solid rgba(0,212,255,0.2)" }}
                  aria-label={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex-shrink-0 relative"
          >
            {/* Glowing rings */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)", transform: "scale(1.3)" }} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-16px] rounded-full border border-dashed opacity-40"
              style={{ borderColor: "#00d4ff" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-32px] rounded-full border border-dashed opacity-20"
              style={{ borderColor: "#7c3aed" }}
            />

            {/* Photo container */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden neon-glow-blue"
              style={{ border: "3px solid rgba(0,212,255,0.4)" }}
            >
              <img
                src="/profile.jpg"
                alt="Nilesh Rajbhar - CSE AI ML Developer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback initials */}
              <div className="w-full h-full items-center justify-center"
                style={{ background: "linear-gradient(135deg, #141414, #1f1f1f)", display: "none" }}>
                <span className="gradient-text font-space font-bold text-8xl">NR</span>
              </div>
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(5,5,5,0.6) 100%)" }} />
            </motion.div>

            {/* Floating tech badges */}
            {[
              { label: "React.js", x: "-60px", y: "20%", color: "#61dafb" },
              { label: "AI/ML", x: "calc(100% + 10px)", y: "20%", color: "#00ff88" },
              { label: "Python", x: "-55px", y: "65%", color: "#3776ab" },
              { label: "Node.js", x: "calc(100% + 5px)", y: "65%", color: "#3c873a" },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="absolute glass-card px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{ left: badge.x, top: badge.y, border: `1px solid ${badge.color}40`, color: badge.color }}
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
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToAbout}
        >
          <span className="text-xs text-slate-500">Scroll Down</span>
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
