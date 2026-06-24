import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────
   Canvas Particle Burst behind the logo
───────────────────────────────────── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const particles = Array.from({ length: 120 }, (_, i) => {
      const angle = (i / 120) * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.3;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random(),
        maxLife: Math.random() * 0.4 + 0.6,
        radius: Math.random() * 2 + 0.5,
        color: ["#00d4ff", "#7c3aed", "#ec4899", "#00ff88"][Math.floor(Math.random() * 4)],
      };
    });

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.life += 0.004;
        if (p.life > p.maxLife) p.life = 0;
        const progress = p.life / p.maxLife;
        const dist = progress * Math.min(cx, cy) * 0.85;
        const px = cx + Math.cos(Math.atan2(p.vy, p.vx)) * dist;
        const py = cy + Math.sin(Math.atan2(p.vy, p.vx)) * dist;
        const alpha = Math.sin(progress * Math.PI) * 0.6;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
};

/* ─────────────────────────────────────
   Typing text animation (no extra lib)
───────────────────────────────────── */
const TypingText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span style={{ fontFamily: "'Space Grotesk', monospace", letterSpacing: "0.15em" }}>
      {displayed}
      <span
        className="animate-pulse"
        style={{ color: "#00d4ff", marginLeft: 2 }}
      >▮</span>
    </span>
  );
};

/* ─────────────────────────────────────
   Main Loader
───────────────────────────────────── */
const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0 = initializing, 1 = loading, 2 = done

  const phases = [
    "INITIALIZING SYSTEMS...",
    "LOADING PORTFOLIO...",
    "CALIBRATING INTERFACE...",
    "BOOTING UP...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 14 + 2;
        if (next >= 100) { clearInterval(interval); return 100; }
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % phases.length), 600);
    return () => clearInterval(t);
  }, [phases.length]);

  const pct = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #030303 0%, #080810 50%, #0a0510 100%)" }}
      >
        {/* Particle canvas */}
        <div className="absolute inset-0">
          <ParticleCanvas />
        </div>

        {/* Background glow orbs */}
        <motion.div
          className="absolute rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ width: 600, height: 600, background: "radial-gradient(circle, #00d4ff, transparent)", top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.08, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          style={{ width: 500, height: 500, background: "radial-gradient(circle, #7c3aed, transparent)", bottom: "10%", right: "10%" }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,212,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.8) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-8">

          {/* Hexagonal Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.35 }}
            className="relative"
          >
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] rounded-full border-2 border-dashed"
              style={{ borderColor: "rgba(0,212,255,0.5)" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-36px] rounded-full border border-dashed"
              style={{ borderColor: "rgba(124,58,237,0.35)" }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-52px] rounded-full border"
              style={{ borderColor: "rgba(236,72,153,0.2)" }}
            />

            {/* Core logo box */}
            <motion.div
              animate={{ boxShadow: ["0 0 20px #00d4ff60, 0 0 40px #00d4ff30", "0 0 40px #7c3aed60, 0 0 80px #7c3aed30", "0 0 20px #00d4ff60, 0 0 40px #00d4ff30"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1a2e 100%)", border: "1px solid rgba(0,212,255,0.4)" }}
            >
              <span className="gradient-text font-space font-black text-5xl select-none">N</span>
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-space font-black text-3xl sm:text-4xl text-white mb-1 tracking-wide">
              Nilesh <span className="gradient-text">Rajbhar</span>
            </h1>
            <p className="text-xs text-slate-500 tracking-widest uppercase font-mono">
              Full Stack Developer · AI & ML Enthusiast
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="w-72 sm:w-96 flex flex-col items-center gap-3"
          >
            <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #00d4ff, #7c3aed, #ec4899)",
                  backgroundSize: "200%",
                  boxShadow: "0 0 10px #00d4ff80, 0 0 20px #7c3aed40",
                  transition: "width 0.15s ease",
                }}
              />
            </div>

            {/* Percentage + phase text */}
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-mono" style={{ color: "#00d4ff" }}>
                <TypingText text={phases[phase]} />
              </span>
              <span className="text-xs font-mono font-bold" style={{ color: "#7c3aed" }}>
                {pct}%
              </span>
            </div>
          </motion.div>

          {/* Orbiting dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="relative w-12 h-12"
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  background: ["#00d4ff", "#7c3aed", "#ec4899", "#00ff88"][i],
                  top: "50%", left: "50%",
                  transformOrigin: "0px 0px",
                  boxShadow: `0 0 8px ${["#00d4ff", "#7c3aed", "#ec4899", "#00ff88"][i]}`,
                }}
                animate={{ rotate: 360 }}
                initial={{ rotate: i * 90, translateX: 22, translateY: -5 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
