import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const achievementsData = [
  {
    value: 150,
    suffix: "+",
    label: "DSA Problems Solved",
    sub: "LeetCode & GeeksforGeeks",
    icon: "🧩",
    color: "#00d4ff",
    bgGrad: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(0,212,255,0.03))",
    border: "rgba(0,212,255,0.3)",
  },
  {
    value: 3,
    suffix: "",
    label: "Projects Built",
    sub: "Python, MERN, AI/ML",
    icon: "🚀",
    color: "#7c3aed",
    bgGrad: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(124,58,237,0.03))",
    border: "rgba(124,58,237,0.3)",
  },
  {
    value: 15,
    suffix: "+",
    label: "Technologies",
    sub: "Frontend, Backend & AI",
    icon: "⚡",
    color: "#ec4899",
    bgGrad: "linear-gradient(135deg, rgba(236,72,153,0.12), rgba(236,72,153,0.03))",
    border: "rgba(236,72,153,0.3)",
  },
  {
    value: 3,
    suffix: "+ Yrs",
    label: "Learning Journey",
    sub: "Consistent Growth",
    icon: "📈",
    color: "#00ff88",
    bgGrad: "linear-gradient(135deg, rgba(0,255,136,0.12), rgba(0,255,136,0.03))",
    border: "rgba(0,255,136,0.3)",
  },
  {
    value: 100,
    suffix: "+",
    label: "GFG Problems",
    sub: "Active Coding Profile",
    icon: "💻",
    color: "#f97316",
    bgGrad: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.03))",
    border: "rgba(249,115,22,0.3)",
  },
  {
    value: 1,
    suffix: "",
    label: "AIML Specialization",
    sub: "B.Tech Final Year Track",
    icon: "🤖",
    color: "#fbbf24",
    bgGrad: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.03))",
    border: "rgba(251,191,36,0.3)",
  },
];

const AchievementCard = ({ item, index }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -6 }}
      className="glass-card rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden group"
      style={{
        background: item.bgGrad,
        border: `1px solid ${item.border}`,
        boxShadow: inView ? `0 0 30px ${item.color}12` : "none",
      }}
    >
      {/* Glow pulse on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ opacity: [0, 0.08, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        style={{ background: item.color }}
      />

      {/* Icon */}
      <motion.div
        className="text-4xl mb-4 achievement-icon-float"
        style={{ filter: `drop-shadow(0 0 10px ${item.color}60)` }}
      >
        {item.icon}
      </motion.div>

      {/* Counter */}
      <div
        className="font-space font-black text-4xl sm:text-5xl mb-1"
        style={{ color: item.color, textShadow: `0 0 20px ${item.color}60` }}
      >
        {inView ? (
          <CountUp end={item.value} duration={2} suffix={item.suffix} />
        ) : (
          `0${item.suffix}`
        )}
      </div>

      {/* Label */}
      <p className="font-space font-bold text-white text-sm mb-1">{item.label}</p>
      <p className="text-slate-500 text-xs">{item.sub}</p>

      {/* Bottom neon line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
        style={{
          background: `linear-gradient(to right, transparent, ${item.color}, transparent)`,
          transformOrigin: "left center",
        }}
      />
    </motion.div>
  );
};

const Achievements = () => (
  <section
    id="achievements"
    style={{ background: "linear-gradient(180deg, rgba(8,6,15,0.96) 0%, rgba(10,8,20,0.97) 100%)" }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* Heading */}
      <div className="text-center mb-14" data-aos="fade-up">
        <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3 font-mono">
          Numbers That Define Me
        </p>
        <h2 className="section-heading text-white mb-4">
          My <span className="gradient-text">Achievements</span>
        </h2>
        <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
        <p className="text-slate-400 mt-4 max-w-xl mx-auto">
          Milestones reached through consistent effort, curiosity and a passion for building.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {achievementsData.map((item, i) => (
          <AchievementCard key={item.label} item={item} index={i} />
        ))}
      </div>

      {/* Animated progress timeline strip */}
      <motion.div
        data-aos="fade-up"
        className="mt-16 glass-card rounded-2xl p-6"
        style={{ border: "1px solid rgba(0,212,255,0.12)" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <h3 className="font-space font-bold text-white">Learning Progress Timeline</h3>
          <span className="text-xs text-slate-500 font-mono">2023 → Present</span>
        </div>
        <div className="relative h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="achievement-timeline-bar absolute top-0 left-0 h-full rounded-full"
            style={{
              background: "linear-gradient(to right, #00d4ff, #7c3aed, #ec4899, #00ff88)",
              backgroundSize: "200%",
              boxShadow: "0 0 15px #00d4ff60",
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-600 font-mono">
          {["C/Java Basics", "Web Dev", "MERN Stack", "AI & ML", "DSA", "Full Stack"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Achievements;
