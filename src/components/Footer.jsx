import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from "react-icons/fi";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";

const quickLinks = [
  { label: "Home",        href: "#home"        },
  { label: "About",       href: "#about"       },
  { label: "Skills",      href: "#skills"      },
  { label: "DSA",         href: "#dsa"         },
  { label: "Projects",    href: "#projects"    },
  { label: "GitHub",      href: "#github"      },
  { label: "Experience",  href: "#experience"  },
  { label: "Education",   href: "#education"   },
  { label: "Contact",     href: "#contact"     },
];

const socialLinks = [
  { icon: <FiGithub size={18} />,       href: "https://github.com/Nilesh1805",                          label: "GitHub",        color: "#e2e8f0" },
  { icon: <FiLinkedin size={18} />,     href: "https://www.linkedin.com/in/nilesh-rajbhar-483371274/",  label: "LinkedIn",      color: "#0a66c2" },
  { icon: <SiGeeksforgeeks size={18}/>, href: "https://www.geeksforgeeks.org/profile/nileshr071e",      label: "GeeksforGeeks", color: "#2f8d46" },
  { icon: <SiLeetcode size={18} />,     href: "https://leetcode.com/u/Nilesh180905/",                   label: "LeetCode",      color: "#ffa116" },
  { icon: <FiMail size={18} />,         href: "mailto:nileshraj18a1@gmail.com",                         label: "Email",         color: "#00d4ff" },
];

const techStack = ["React.js", "Three.js", "Tailwind CSS", "Framer Motion", "GSAP"];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleNavClick = (href) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #080610 0%, #030208 100%)",
        borderTop: "1px solid rgba(0,212,255,0.08)",
      }}
    >
      {/* Top neon glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #00d4ff50, #7c3aed50, #ec489930, transparent)" }}
      />

      {/* Background orb */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}
              >
                <span className="text-white font-bold font-space text-xl">N</span>
              </div>
              <span className="font-space font-bold text-xl text-white">
                Nilesh <span className="gradient-text">Rajbhar</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              CSE (AI&ML) student passionate about building intelligent web applications and solving real-world problems through technology.
            </p>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center transition-all"
                  style={{ border: `1px solid ${s.color}25`, color: s.color }}
                  aria-label={s.label}
                  id={`footer-social-${s.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-space font-bold text-white mb-4 text-xs uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-slate-500 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                    id={`footer-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <span className="w-3 h-px bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Status + Built With */}
          <div>
            <h4 className="font-space font-bold text-white mb-4 text-xs uppercase tracking-widest">
              Current Status
            </h4>
            <div className="space-y-3 mb-6">
              <div className="glass-card rounded-xl p-3 flex items-center gap-3" style={{ border: "1px solid rgba(0,255,136,0.2)" }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <span className="text-sm text-green-400 font-semibold">Available for Internships</span>
              </div>
              <div className="glass-card rounded-xl p-3 flex items-center gap-3" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
                <span className="text-xl">🎓</span>
                <div>
                  <p className="text-xs text-slate-600">Currently Studying</p>
                  <p className="text-sm text-white font-medium">B.Tech CSE (AI &amp; ML)</p>
                </div>
              </div>
              <div className="glass-card rounded-xl p-3 flex items-center gap-3" style={{ border: "1px solid rgba(124,58,237,0.15)" }}>
                <span className="text-xl">📍</span>
                <div>
                  <p className="text-xs text-slate-600">Location</p>
                  <p className="text-sm text-white font-medium">Lucknow, India</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-slate-600 text-xs uppercase tracking-widest mb-2 font-mono">Built with</p>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full font-mono"
                    style={{ background: "rgba(0,212,255,0.08)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.15)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,212,255,0.12), transparent)" }}
        />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm flex items-center gap-1.5 font-mono">
            © 2026 Nilesh Rajbhar. Built with&nbsp;
            <FiHeart className="text-red-400 animate-pulse" size={13} fill="currentColor" />
            &nbsp;React & Three.js.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", boxShadow: "0 0 20px rgba(0,212,255,0.4)" }}
            aria-label="Scroll to top"
            id="scroll-to-top-btn"
          >
            <FiArrowUp className="text-white" size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
