import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "2023-Present",
    title: "Started B.Tech Journey",
    subtitle: "RR Group of Institutions, Lucknow",
    description:
      "Began my Computer Science Engineering (AI & ML) degree, diving into C,Python & JAVA programming, data structures, and core computer science fundamentals.",
    icon: "🎓",
    color: "#00d4ff",
    side: "left",
    tags: ["C", "Data Structures", "Mathematics", "Computer Science"],
  },
  {
    year: "2024",
    title: "Discovered Web Development",
    subtitle: "Frontend Journey Begins",
    description:
      "Fell in love with web development. Mastered HTML, CSS, JavaScript and built my first responsive websites. Started exploring React.js ecosystem.",
    icon: "🌐",
    color: "#7c3aed",
    side: "right",
    tags: ["HTML", "CSS", "JavaScript", "React.js"],
  },
  {
    year: "2025",
    title: "MERN Stack Deep Dive",
    subtitle: "Full Stack Development",
    description:
      "Explored the complete MERN stack — MongoDB, Express.js, React, Node.js. Built the Expense Management System as a full-stack project.",
    icon: "⚙️",
    color: "#ec4899",
    side: "left",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    year: "2025",
    title: "AI & Machine Learning",
    subtitle: "AIML Specialization",
    description:
      "Started AIML specialization coursework. Learned Python data science stack and built an AI Disease Prediction System using Scikit-Learn.",
    icon: "🤖",
    color: "#00ff88",
    side: "right",
    tags: ["Python", "Scikit-Learn", "NumPy", "Pandas", "ML"],
  },
  {
    year: "2026",
    title: "DSA & Competitive Coding",
    subtitle: "Problem Solving Mastery",
    description:
      "Intensively practiced Data Structures & Algorithms on GeeksforGeeks and LeetCode. Solved 100+ problems across arrays, trees, graphs and dynamic programming.",
    icon: "🧩",
    color: "#f97316",
    side: "left",
    tags: ["Java", "DSA", "LeetCode", "GeeksforGeeks"],
  },
  {
    year: "2026",
    title: "Open Source & Portfolio",
    subtitle: "Present — Building the Future",
    description:
      "Contributing to open source, building a production-grade 3D portfolio, and seeking impactful internship opportunities in full-stack or AI/ML roles.",
    icon: "🚀",
    color: "#00d4ff",
    side: "right",
    tags: ["Three.js", "React", "Open Source", "Internship Ready"],
  },
];

/* ─────────────────────────────────────
   Timeline Item
───────────────────────────────────── */
const TimelineItem = ({ item, index }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const isLeft = item.side === "left";

  return (
    <div ref={ref} className={`flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"} mb-12`}>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        whileHover={{ scale: 1.02, y: -4 }}
        className="flex-1 glass-card rounded-2xl p-6"
        style={{
          border: `1px solid ${item.color}25`,
          boxShadow: inView ? `0 0 25px ${item.color}10` : "none",
          maxWidth: "calc(50% - 2rem)",
        }}
      >
        {/* Year badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono mb-3"
          style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
        >
          {item.year}
        </div>

        <h3 className="font-space font-bold text-white text-lg mb-1">{item.title}</h3>
        <p className="text-sm font-medium mb-3" style={{ color: item.color }}>{item.subtitle}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full"
              style={{ background: `${item.color}10`, color: item.color, border: `1px solid ${item.color}20` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Center icon node */}
      <div className="relative flex flex-col items-center flex-shrink-0" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{
            background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
            border: `2px solid ${item.color}`,
            boxShadow: `0 0 20px ${item.color}50, 0 0 40px ${item.color}20`,
          }}
        >
          {item.icon}
        </motion.div>
      </div>

      {/* Spacer for the other side */}
      <div className="flex-1" style={{ maxWidth: "calc(50% - 2rem)" }} />
    </div>
  );
};

/* ─────────────────────────────────────
   Main Experience Section
───────────────────────────────────── */
const Experience = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="experience"
      style={{ background: "linear-gradient(180deg, rgba(10,8,20,0.97) 0%, rgba(8,6,15,0.96) 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3 font-mono">
            My Journey
          </p>
          <h2 className="section-heading text-white mb-4">
            Experience &amp; <span className="gradient-text">Timeline</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A neon-lit path through my academic journey, technical growth and coding milestones.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical neon line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: "rgba(0,212,255,0.08)", zIndex: 0 }}
          />
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, #00d4ff, #7c3aed, #ec4899, #00ff88, #00d4ff)",
              boxShadow: "0 0 10px #00d4ff60, 0 0 20px #7c3aed40",
              zIndex: 1,
            }}
          />

          {/* Items */}
          {timelineData.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
