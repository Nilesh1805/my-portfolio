import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiStar } from "react-icons/fi";

const highlights = [
  { text: "Strong foundation in Java and Data Structures & Algorithms", color: "#f97316" },
  { text: "MERN Stack development experience (React, Node.js, MongoDB)", color: "#7c3aed" },
  { text: "AI & ML background with Python, NumPy, Pandas & Scikit-Learn", color: "#00ff88" },
  { text: "Active on competitive coding platforms (LeetCode & GFG)", color: "#eab308" },
  { text: "College Codethon 3rd Position Holder", color: "#f59e0b" },
  { text: "HackLance Technical Club Member — organizer & collaborator", color: "#00d4ff" },
  { text: "Strong problem-solving mindset with algorithmic thinking", color: "#ec4899" },
  { text: "Quick learner, collaborative team player, open to internships", color: "#22c55e" },
];

const HighlightRow = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ delay: index * 0.09, duration: 0.5, ease: "easeOut" }}
    whileHover={{ x: 5, scale: 1.015 }}
    className="flex items-start gap-4 p-4 rounded-xl group transition-all cursor-default"
    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
  >
    <FiCheckCircle
      size={18}
      className="flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110"
      style={{ color: item.color }}
    />
    <span className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
      {item.text}
    </span>
  </motion.div>
);

const RecruiterHighlight = () => (
  <section
    id="why-hire"
    style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.95) 0%, rgba(10,10,10,0.97) 100%)" }}
  >
    <div className="max-w-5xl mx-auto px-4 sm:px-6">

      {/* ── Heading ── */}
      <div className="text-center mb-14" data-aos="fade-up">
        <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">
          For Recruiters & Hiring Managers
        </p>
        <h2 className="section-heading text-white mb-4">
          Why <span className="gradient-text">Hire Me?</span>
        </h2>
        <div
          className="w-20 h-1 mx-auto rounded-full mb-5"
          style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }}
        />
        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          A well-rounded CS student combining technical depth with real-world project experience
          and a genuine passion for engineering excellence.
        </p>
      </div>

      {/* ── Highlights Frame ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl p-8 sm:p-10"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 60px rgba(0,212,255,0.04), 0 0 120px rgba(124,58,237,0.03)",
        }}
      >
        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-20 h-20 rounded-tl-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px]"
            style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }} />
          <div className="absolute top-0 left-0 h-full w-[1px]"
            style={{ background: "linear-gradient(to bottom, #00d4ff, transparent)" }} />
        </div>
        <div className="absolute bottom-0 right-0 w-20 h-20 rounded-br-3xl overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-[1px]"
            style={{ background: "linear-gradient(to left, #7c3aed, transparent)" }} />
          <div className="absolute bottom-0 right-0 h-full w-[1px]"
            style={{ background: "linear-gradient(to top, #7c3aed, transparent)" }} />
        </div>

        {/* Star badge */}
        <div className="flex items-center gap-2 mb-8">
          <FiStar size={14} className="text-yellow-400" />
          <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
            Key Strengths
          </span>
        </div>

        {/* 2-column grid of highlights */}
        <div className="grid sm:grid-cols-2 gap-3">
          {highlights.map((item, i) => (
            <HighlightRow key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            Open to <strong className="text-white">internships</strong> and{" "}
            <strong className="text-white">full-time opportunities</strong> in software engineering.
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-sm py-2.5 px-6 flex-shrink-0 flex items-center gap-2"
            id="why-hire-contact-btn"
          >
            Get In Touch →
          </motion.a>
        </div>
      </motion.div>

    </div>
  </section>
);

export default RecruiterHighlight;
