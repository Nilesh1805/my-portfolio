import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Home",       href: "#home"        },
  { label: "About",      href: "#about"       },
  { label: "Skills",     href: "#skills"      },
  { label: "DSA",        href: "#dsa"         },
  { label: "Projects",   href: "#projects"    },
  { label: "GitHub",     href: "#github"      },
  { label: "Experience", href: "#experience"  },
  { label: "Education",  href: "#education"   },
  { label: "Contact",    href: "#contact"     },
];

/* IntersectionObserver active section tracking */
const useActiveSection = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return active;
};

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((href) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-3 left-4 right-4 z-[9990] rounded-2xl transition-all duration-500 ${
          scrolled ? "glass-card neon-glow-blue py-3" : "bg-transparent py-4"
        }`}
        style={scrolled ? { border: "1px solid rgba(0,212,255,0.2)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick("#home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", boxShadow: "0 0 15px rgba(0,212,255,0.4)" }}
            >
              <span className="text-white font-bold font-space text-lg">N</span>
            </div>
            <span className="font-space font-bold text-lg hidden sm:block" style={{ color: "#e2e8f0" }}>
              Nilesh<span className="gradient-text">.</span>
            </span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-400 hover:text-cyan-400 hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(0,212,255,0.1)" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Hire Me CTA */}
            <motion.button
              onClick={() => handleNavClick("#contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block btn-primary text-sm py-2 px-5"
              id="hire-me-btn"
            >
              Hire Me
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center glass-card"
              style={{ border: "1px solid rgba(0,212,255,0.2)" }}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen
                ? <FiX className="text-cyan-400" size={18} />
                : <FiMenu className="text-cyan-400" size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-[9989] glass-card rounded-2xl p-4"
            style={{ border: "1px solid rgba(0,212,255,0.2)", boxShadow: "0 0 40px rgba(0,212,255,0.08)" }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNavClick(link.href)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  active === link.href.replace("#", "")
                    ? "text-cyan-400 bg-cyan-400/10"
                    : "text-slate-400 hover:text-cyan-400 hover:bg-white/5"
                }`}
              >
                {link.label}
              </motion.button>
            ))}
            <div className="mt-3 pt-3 border-t border-white/10">
              <button
                onClick={() => handleNavClick("#contact")}
                className="w-full btn-primary text-sm py-2 text-center"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
