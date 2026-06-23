import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiGitCommit, FiStar, FiGitBranch } from "react-icons/fi";

const GITHUB_USER = "Nilesh1805";

const statCards = [
  {
    label: "Total Repositories",
    value: "10+",
    icon: <FiGitBranch size={24} />,
    color: "#00d4ff",
    desc: "Public projects on GitHub",
  },
  {
    label: "GitHub Stars",
    value: "5+",
    icon: <FiStar size={24} />,
    color: "#f59e0b",
    desc: "Stars received across repos",
  },
  {
    label: "Total Commits",
    value: "200+",
    icon: <FiGitCommit size={24} />,
    color: "#7c3aed",
    desc: "Contributions this year",
  },
  {
    label: "Following",
    value: "Open Source",
    icon: <FiGithub size={24} />,
    color: "#00ff88",
    desc: "Open source contributor",
  },
];

const GitHubStats = () => {
  return (
    <section id="github" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.94) 0%, rgba(8,8,8,0.96) 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">Open Source Activity</p>
          <h2 className="section-heading text-white mb-4">
            GitHub <span className="gradient-text">Statistics</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Consistent commits, growing repositories, and a passion for open-source development.
          </p>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="glass-card rounded-2xl p-5 text-center"
              style={{ border: `1px solid ${card.color}20` }}
            >
              <div className="flex justify-center mb-3" style={{ color: card.color }}>
                {card.icon}
              </div>
              <div className="font-space font-bold text-2xl mb-1" style={{ color: card.color }}>
                {card.value}
              </div>
              <div className="text-white text-sm font-semibold mb-1">{card.label}</div>
              <div className="text-slate-500 text-xs">{card.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Readme Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            data-aos="fade-right"
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-2xl overflow-hidden p-4"
          >
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&theme=transparent&hide_border=true&title_color=00d4ff&icon_color=7c3aed&text_color=94a3b8&bg_color=00000000&count_private=true`}
              alt="GitHub Stats"
              className="w-full rounded-xl"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            data-aos="fade-left"
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-2xl overflow-hidden p-4"
          >
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USER}&theme=transparent&hide_border=true&ring=00d4ff&fire=7c3aed&currStreakLabel=00d4ff&sideLabels=94a3b8&dates=94a3b8&stroke=0a1628&background=00000000`}
              alt="GitHub Streak"
              className="w-full rounded-xl"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Top Languages */}
        <motion.div
          data-aos="fade-up"
          whileHover={{ scale: 1.01 }}
          className="glass-card rounded-2xl overflow-hidden p-4 max-w-xl mx-auto"
        >
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&theme=transparent&hide_border=true&title_color=00d4ff&text_color=94a3b8&bg_color=00000000`}
            alt="Top Languages"
            className="w-full rounded-xl"
            loading="lazy"
          />
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-10" data-aos="fade-up">
          <motion.a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 btn-primary"
            id="visit-github-btn"
          >
            <FiGithub size={18} /> Visit My GitHub Profile
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
