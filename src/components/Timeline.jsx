import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaCode, FaBrain, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { timelineData } from "../data/timeline";

const iconMap = {
  education: <FaGraduationCap size={20} />,
  code: <FaCode size={20} />,
  ai: <FaBrain size={20} />,
  work: <FaBriefcase size={20} />,
  club: <FaUsers size={20} />,
};

const TimelineCard = ({ item, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-start gap-0 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col mb-12`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="flex-1 glass-card rounded-2xl p-6 md:max-w-[calc(50%-40px)]"
        style={{ border: `1px solid ${item.color}25` }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: `${item.color}15`, color: item.color }}>
                {item.type}
              </span>
              {item.seeking && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 animate-pulse">
                  Seeking
                </span>
              )}
            </div>
            <h3 className="font-space font-bold text-lg text-white">{item.title}</h3>
            <p className="font-semibold text-sm mt-0.5" style={{ color: item.color }}>{item.organization}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><FiCalendar size={12} /> {item.period}</span>
          <span className="flex items-center gap-1"><FaMapMarkerAlt size={12} /> {item.location}</span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {item.skills.map((s) => (
            <span key={s} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${item.color}10`, color: item.color, border: `1px solid ${item.color}20` }}>
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Center Icon (desktop) */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0 z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
            border: `2px solid ${item.color}`,
            boxShadow: `0 0 20px ${item.color}40`,
            color: item.color,
          }}
        >
          {iconMap[item.icon]}
        </motion.div>
      </div>

      {/* Mobile icon */}
      <div className="flex md:hidden items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: `${item.color}15`, border: `2px solid ${item.color}`, color: item.color }}>
          {iconMap[item.icon]}
        </div>
        <span className="text-xs text-slate-500">{item.period}</span>
      </div>

      {/* Spacer on alternate side for desktop */}
      <div className="hidden md:block flex-1" />
    </div>
  );
};

const Timeline = () => {
  return (
    <section id="timeline" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.94) 0%, rgba(8,8,8,0.96) 100%)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">My Journey</p>
          <h2 className="section-heading text-white mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 timeline-line -translate-x-1/2" />

          {timelineData.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
