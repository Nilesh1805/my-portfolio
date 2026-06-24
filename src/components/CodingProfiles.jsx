import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";
import { codingProfiles } from "../data/codingProfiles";

/* Icon map */
const platformIcons = {
  gfg:      <SiGeeksforgeeks size={32} />,
  leetcode: <SiLeetcode size={32} />,
  github:   <FiGithub size={32} />,
  linkedin: <FiLinkedin size={32} />,
};

/* ─────────────────────────────────────
   Profile Card
───────────────────────────────────── */
const ProfileCard = ({ profile, index }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = platformIcons[profile.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden"
      style={{
        background: hovered ? profile.bgGradient : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? profile.borderColor : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 0 30px ${profile.color}25, 0 0 60px ${profile.color}10` : "none",
        transition: "all 0.35s ease",
      }}
    >
      {/* Animated corner glow */}
      <motion.div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl"
        animate={{ opacity: hovered ? 0.25 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: profile.color }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: `${profile.color}18`,
              border: `1px solid ${profile.color}35`,
              color: profile.color,
              boxShadow: hovered ? `0 0 20px ${profile.color}40` : "none",
            }}
          >
            {Icon}
          </motion.div>
          <div>
            <h3 className="font-space font-bold text-white text-lg leading-tight">
              {profile.name}
            </h3>
            <p className="text-sm font-mono" style={{ color: profile.color }}>
              @{profile.username}
            </p>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono"
          style={{ background: `${profile.color}15`, border: `1px solid ${profile.color}30`, color: profile.color }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: profile.color }} />
          Active
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed">{profile.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {profile.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-3 text-center"
            style={{ background: `${profile.color}08`, border: `1px solid ${profile.color}15` }}
          >
            <p className="font-space font-bold text-base" style={{ color: profile.color }}>
              {stat.value}
            </p>
            <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Neon border bottom line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-3xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `linear-gradient(to right, transparent, ${profile.color}, transparent)` }}
      />

      {/* Visit Button */}
      <motion.a
        href={profile.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${profile.color}cc, ${profile.color}88)`
            : `${profile.color}15`,
          color: profile.color,
          border: `1px solid ${profile.color}30`,
        }}
        id={`profile-visit-${profile.id}`}
      >
        <FiExternalLink size={15} />
        Visit Profile
      </motion.a>
    </motion.div>
  );
};

/* ─────────────────────────────────────
   Main Section
───────────────────────────────────── */
const CodingProfiles = () => (
  <section
    id="profiles"
    style={{ background: "linear-gradient(180deg, rgba(8,6,16,0.96) 0%, rgba(10,8,20,0.97) 100%)" }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* Heading */}
      <div className="text-center mb-14" data-aos="fade-up">
        <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3 font-mono">
          Where I Code
        </p>
        <h2 className="section-heading text-white mb-4">
          Coding <span className="gradient-text">Profiles</span>
        </h2>
        <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
        <p className="text-slate-400 mt-4 max-w-xl mx-auto">
          Active on leading coding platforms — constantly practicing, competing and contributing.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {codingProfiles.map((profile, i) => (
          <ProfileCard key={profile.id} profile={profile} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default CodingProfiles;
