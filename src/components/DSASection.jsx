import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiCode, FiCheckCircle, FiRefreshCw } from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { FaJava, FaPython, FaJs } from "react-icons/fa";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const coreTopics = [
  "Arrays & Strings",
  "Linked Lists",
  "Stacks & Queues",
  "Recursion & Backtracking",
  "Searching Algorithms",
  "Sorting Algorithms",
  "Basic Trees",
  "Object-Oriented Programming",
  "Time & Space Complexity",
  "Dynamic Programming Basics",
  "Greedy Algorithms",
];

const languages = [
  { name: "Java", icon: <FaJava size={22} />, color: "#f97316", primary: true, desc: "Primary for DSA" },
  { name: "Python", icon: <FaPython size={22} />, color: "#3b82f6", primary: false, desc: "ML & Scripts" },
  { name: "JavaScript", icon: <FaJs size={22} />, color: "#eab308", primary: false, desc: "Web & Logic" },
  { name: "C", icon: <FiCode size={22} />, color: "#94a3b8", primary: false, desc: "Systems" },
];

/* ─────────────────────────────────────────────
   LEETCODE LIVE STATS HOOK
───────────────────────────────────────────── */
const useLeetCodeStats = (username) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://alfa-leetcode-api.onrender.com/${username}`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setStats({
        total: data.totalSolved ?? data.totalQuestions ?? "—",
        easy: data.easySolved ?? "—",
        medium: data.mediumSolved ?? "—",
        hard: data.hardSolved ?? "—",
        ranking: data.ranking ?? "—",
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};

/* ─────────────────────────────────────────────
   STAT PILL
───────────────────────────────────────────── */
const StatPill = ({ label, value, color }) => (
  <div className="flex flex-col items-center gap-1">
    <span
      className="font-space font-bold text-xl"
      style={{ color }}
    >
      {value}
    </span>
    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{label}</span>
  </div>
);

/* ─────────────────────────────────────────────
   LEETCODE CARD
───────────────────────────────────────────── */
const LeetCodeCard = () => {
  const { stats, loading, error, refetch } = useLeetCodeStats("Nilesh180905");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card rounded-2xl p-7 flex flex-col gap-5 relative overflow-hidden group"
      style={{ border: "1px solid rgba(234,179,8,0.2)", boxShadow: "0 4px 32px rgba(234,179,8,0.05)" }}
    >
      {/* Glow accent */}
      <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
        style={{ background: "linear-gradient(to right, #f97316, #eab308)" }} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)" }}>
            <SiLeetcode size={26} style={{ color: "#eab308" }} />
          </div>
          <div>
            <h3 className="font-space font-bold text-white text-lg">LeetCode</h3>
            <p className="text-slate-400 text-xs font-mono">@Nilesh180905</p>
          </div>
        </div>
        <button
          onClick={refetch}
          title="Refresh stats"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/5"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <FiRefreshCw size={13} className={`text-slate-500 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Live stats */}
      <div className="grid grid-cols-4 gap-2 py-4 px-2 rounded-xl"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <StatPill label="Total" value={loading ? "…" : error ? "—" : stats?.total} color="#e2e8f0" />
        <StatPill label="Easy" value={loading ? "…" : error ? "—" : stats?.easy} color="#22c55e" />
        <StatPill label="Medium" value={loading ? "…" : error ? "—" : stats?.medium} color="#eab308" />
        <StatPill label="Hard" value={loading ? "…" : error ? "—" : stats?.hard} color="#ef4444" />
      </div>

      {error && (
        <p className="text-xs text-slate-600 text-center -mt-1">
          Could not fetch live stats — <button onClick={refetch} className="text-yellow-600 underline">retry</button>
        </p>
      )}

      {/* Platform label */}
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: "rgba(234,179,8,0.1)", color: "#eab308", border: "1px solid rgba(234,179,8,0.2)" }}>
          Competitive Coding
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
          Java · Python
        </span>
      </div>

      {/* CTA */}
      <motion.a
        href="https://leetcode.com/u/Nilesh180905/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all"
        style={{
          background: "linear-gradient(135deg, rgba(234,179,8,0.15), rgba(249,115,22,0.15))",
          border: "1px solid rgba(234,179,8,0.3)",
          color: "#eab308",
        }}
      >
        <SiLeetcode size={16} />
        View LeetCode Profile
        <FiExternalLink size={13} />
      </motion.a>

      {/* Bottom glow on hover */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: "linear-gradient(to right, #f97316, #eab308, transparent)" }} />
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   GEEKSFORGEEKS CARD
───────────────────────────────────────────── */
const GFGCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: 0 }}
    whileHover={{ y: -6, scale: 1.02 }}
    className="glass-card rounded-2xl p-7 flex flex-col gap-5 relative overflow-hidden group"
    style={{ border: "1px solid rgba(34,197,94,0.2)", boxShadow: "0 4px 32px rgba(34,197,94,0.05)" }}
  >
    {/* Glow accent */}
    <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
      style={{ background: "linear-gradient(to right, #16a34a, #22c55e)" }} />

    {/* Header */}
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
        <SiGeeksforgeeks size={26} style={{ color: "#22c55e" }} />
      </div>
      <div>
        <h3 className="font-space font-bold text-white text-lg">GeeksforGeeks</h3>
        <p className="text-slate-400 text-xs font-mono">@nileshr071e</p>
      </div>
    </div>

    {/* Info tiles */}
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Platform", value: "GeeksforGeeks", color: "#22c55e" },
        { label: "Language", value: "Java / C", color: "#22c55e" },
        { label: "Focus", value: "DSA Practice", color: "#22c55e" },
        { label: "Status", value: "Active Learner", color: "#22c55e" },
      ].map((item) => (
        <div key={item.label} className="rounded-xl px-3 py-2.5"
          style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.1)" }}>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">{item.label}</p>
          <p className="text-sm font-semibold" style={{ color: item.color }}>{item.value}</p>
        </div>
      ))}
    </div>

    {/* Platform label */}
    <div className="flex items-center gap-2">
      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
        style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
        Competitive Programming
      </span>
    </div>

    {/* CTA */}
    <motion.a
      href="https://www.geeksforgeeks.org/profile/nileshr071e"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all"
      style={{
        background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.15))",
        border: "1px solid rgba(34,197,94,0.3)",
        color: "#22c55e",
      }}
    >
      <SiGeeksforgeeks size={16} />
      View GFG Profile
      <FiExternalLink size={13} />
    </motion.a>

    {/* Bottom glow on hover */}
    <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
      style={{ background: "linear-gradient(to right, #16a34a, #22c55e, transparent)" }} />
  </motion.div>
);

/* ─────────────────────────────────────────────
   TOPIC ITEM
───────────────────────────────────────────── */
const TopicItem = ({ topic, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ delay: index * 0.055, duration: 0.4 }}
    className="flex items-center gap-3 py-2 px-3 rounded-lg group hover:bg-white/[0.03] transition-colors"
  >
    <FiCheckCircle size={15} className="flex-shrink-0 text-green-400 group-hover:text-green-300 transition-colors" />
    <span className="text-slate-300 text-sm group-hover:text-white transition-colors font-mono">{topic}</span>
  </motion.div>
);

/* ─────────────────────────────────────────────
   LANGUAGE BADGE
───────────────────────────────────────────── */
const LanguageBadge = ({ lang, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    whileHover={{ y: -4, scale: 1.06 }}
    className="relative flex flex-col items-center gap-2 p-4 rounded-2xl group"
    style={{
      background: `${lang.color}08`,
      border: `1px solid ${lang.color}25`,
    }}
  >
    {lang.primary && (
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap"
        style={{ background: lang.color, color: "#000" }}>
        Primary
      </span>
    )}
    <span style={{ color: lang.color }} className="group-hover:scale-110 transition-transform">
      {lang.icon}
    </span>
    <span className="font-space font-bold text-sm text-white">{lang.name}</span>
    <span className="text-[10px] text-slate-500">{lang.desc}</span>
  </motion.div>
);

/* ─────────────────────────────────────────────
   MAIN DSA SECTION
───────────────────────────────────────────── */
const DSASection = () => (
  <section
    id="dsa"
    style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.95) 0%, rgba(10,10,10,0.97) 100%)" }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* ── Heading ── */}
      <div className="text-center mb-16" data-aos="fade-up">
        <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">
          Problem Solving & Coding
        </p>
        <h2 className="section-heading text-white mb-4">
          Data Structures &{" "}
          <span className="gradient-text">Algorithms</span>
        </h2>
        <div className="w-20 h-1 mx-auto rounded-full mb-6"
          style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm">
          Passionate about solving algorithmic challenges and continuously improving problem-solving skills using Java.
          Regularly practice coding problems on competitive programming platforms to strengthen logical thinking,
          optimize solutions, and prepare for software engineering interviews.
        </p>
      </div>

      {/* ── Two-column: Topics + Languages ── */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">

        {/* Core Topics */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-7"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
              <FiCode size={16} className="text-cyan-400" />
            </div>
            <div>
              <h3 className="font-space font-bold text-white text-lg">Core Topics</h3>
              <p className="text-slate-500 text-xs">{coreTopics.length} topics mastered</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
            {coreTopics.map((t, i) => (
              <TopicItem key={t} topic={t} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Languages + stat strip */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          {/* Languages */}
          <div className="glass-card rounded-2xl p-7 flex-1"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <h3 className="font-space font-bold text-white text-lg mb-6">Programming Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {languages.map((lang, i) => (
                <LanguageBadge key={lang.name} lang={lang} index={i} />
              ))}
            </div>
          </div>

          {/* Quick stat strip */}
          <div className="glass-card rounded-2xl p-5"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Primary Language", value: "Java", color: "#f97316" },
                { label: "Topics Covered",   value: "11+",  color: "#00d4ff" },
                { label: "Practice Status",  value: "Active", color: "#22c55e" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-space font-bold text-xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Coding Profiles Dashboard ── */}
      <div className="mb-4" data-aos="fade-up">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Coding Journey</p>
          <h3 className="font-space font-bold text-2xl text-white mb-2">
            My <span className="gradient-text">Coding Profiles</span>
          </h3>
          <p className="text-slate-500 text-sm">Track my progress across competitive programming platforms</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <GFGCard />
          <LeetCodeCard />
        </div>
      </div>

    </div>
  </section>
);

export default DSASection;
