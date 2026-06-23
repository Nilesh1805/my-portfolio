import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { achievements, stats } from "../data/achievements";

/* ──────────────────────────────────────────
   Achievement Card — alternating slide-in
────────────────────────────────────────── */
const AchievementCard = ({ item, index }) => {
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -70 : 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.13, duration: 0.65, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="glass-card rounded-2xl p-7 flex flex-col gap-5 group relative overflow-hidden"
      style={{
        border: `1px solid ${item.color}25`,
        boxShadow: `0 4px 32px ${item.color}08`,
      }}
    >
      {/* Glowing corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at top right, ${item.color}18, transparent 70%)` }}
      />

      {/* Tag badge */}
      <span
        className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
        style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
      >
        {item.tag}
      </span>

      {/* Floating emoji icon */}
      <div
        className="achievement-icon-float w-14 h-14 rounded-2xl flex items-center justify-center text-2xl select-none"
        style={{
          background: `${item.color}12`,
          border: `1px solid ${item.color}30`,
          boxShadow: `0 0 24px ${item.color}18`,
        }}
      >
        {item.emoji}
      </div>

      {/* Stat number */}
      <div>
        <div
          className="font-space font-bold text-3xl mb-0.5"
          style={{ color: item.color }}
        >
          {item.stat}
        </div>
        <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-widest">
          {item.statLabel}
        </p>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="font-space font-bold text-white text-[1.05rem] mb-2 group-hover:text-white transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
      />
    </motion.div>
  );
};

/* ──────────────────────────────────────────
   Animated stat counter card
────────────────────────────────────────── */
const StatCounter = ({ stat, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.82 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ delay: index * 0.12, duration: 0.55, ease: "easeOut" }}
    whileHover={{ y: -6, scale: 1.05 }}
    className="glass-card rounded-2xl p-6 text-center flex flex-col items-center gap-3 group"
    style={{ border: "1px solid rgba(255,255,255,0.06)" }}
  >
    {/* Emoji icon */}
    <span className="text-2xl select-none">{stat.icon}</span>

    {/* Count-up number */}
    <div className="gradient-text font-space font-bold text-4xl">
      {inView ? (
        <CountUp end={stat.value} duration={2.2} suffix={stat.suffix} />
      ) : (
        `0${stat.suffix}`
      )}
    </div>

    {/* Label */}
    <p className="text-slate-400 text-sm leading-snug">{stat.label}</p>
  </motion.div>
);

/* ──────────────────────────────────────────
   Achievement timeline strip (decorative)
────────────────────────────────────────── */
const TimelineStrip = ({ inView }) => (
  <div className="hidden md:flex items-center justify-between mb-12 relative px-4">
    {/* Background track */}
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/[0.06]" />
    {/* Animated progress fill */}
    {inView && (
      <div
        className="achievement-timeline-bar absolute left-0 top-1/2 -translate-y-1/2 h-[1px]"
        style={{ background: "linear-gradient(to right, rgba(255,255,255,0.03), rgba(255,255,255,0.12), rgba(255,255,255,0.03))" }}
      />
    )}
    {/* Dot markers */}
    {achievements.map((item, i) => (
      <motion.div
        key={item.id}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3 + i * 0.18, duration: 0.4 }}
        className="relative z-10 flex flex-col items-center gap-2"
      >
        <div
          className="w-3 h-3 rounded-full ring-4"
          style={{
            background: item.color,
            boxShadow: `0 0 12px ${item.color}60`,
            ringColor: `${item.color}20`,
          }}
        />
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: item.color }}>
          {item.tag}
        </span>
      </motion.div>
    ))}
  </div>
);

/* ──────────────────────────────────────────
   Main Achievements Section
────────────────────────────────────────── */
const Achievements = () => {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: stripRef, inView: stripInView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section
      id="achievements"
      style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.92) 0%, rgba(10,10,10,0.95) 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Section Heading ── */}
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">
            Recognition & Involvement
          </p>
          <h2 className="section-heading text-white mb-4">
            Achievements &{" "}
            <span className="gradient-text">Leadership</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }}
          />
          <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-sm leading-relaxed">
            Milestones that reflect my commitment to technical excellence, continuous learning, and community contribution.
          </p>
        </div>

        {/* ── Animated Timeline Strip ── */}
        <div ref={stripRef}>
          <TimelineStrip inView={stripInView} />
        </div>

        {/* ── Achievement Cards (alternating slide-in) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ── Count-up Statistics ── */}
        <div
          className="relative rounded-3xl p-8 mb-2"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          data-aos="fade-up"
        >
          <p className="text-center text-xs font-semibold tracking-widest text-slate-500 uppercase mb-8">
            By the Numbers
          </p>
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} index={i} inView={statsInView} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Achievements;
