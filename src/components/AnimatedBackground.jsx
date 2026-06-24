import React, { useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/* ─────────────────────────────────────
   Floating code symbols (pure CSS)
───────────────────────────────────── */
const CODE_SYMBOLS = ["</>", "{}", "()", "[]", "=>", "//", "&&", "||", "fn()", "0x1F"];

const SYMBOLS_CONFIG = CODE_SYMBOLS.map((sym, i) => ({
  symbol: sym,
  style: {
    fontSize: `${Math.floor(Math.random() * 10 + 10)}px`,
    opacity: (Math.random() * 0.04 + 0.025).toFixed(3),
    left: `${(i / CODE_SYMBOLS.length) * 90 + 3}%`,
    top: `${(i % 5) * 18 + 5}%`,
    duration: `${Math.floor(Math.random() * 12 + 14)}s`,
    delay: `${-Math.floor(Math.random() * 20)}s`,
  },
}));

const FloatingSymbol = ({ symbol, style }) => (
  <div
    className="floating-code-symbol"
    style={{
      position: "absolute",
      fontFamily: "'Space Grotesk', monospace",
      fontSize: style.fontSize,
      color: `rgba(0,212,255,${style.opacity})`,
      left: style.left,
      top: style.top,
      animationDuration: style.duration,
      animationDelay: style.delay,
      pointerEvents: "none",
      userSelect: "none",
      letterSpacing: "0.05em",
      fontWeight: 300,
    }}
  >
    {symbol}
  </div>
);

/* ─────────────────────────────────────
   Neon Glow Orbs (Framer)
───────────────────────────────────── */
const GlowOrb = ({ x, y, size, color, duration, delay }) => (
  <motion.div
    style={{
      position: "absolute",
      width: size, height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: "blur(90px)",
      left: x, top: y,
      pointerEvents: "none",
    }}
    animate={{ x: [0, 60, -40, 20, 0], y: [0, -40, 30, -20, 0], scale: [1, 1.15, 0.9, 1.05, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ─────────────────────────────────────
   Pre-generated orb configs (neon colors)
───────────────────────────────────── */
const ORBS = [
  { x: "5%",  y: "10%", size: 600, color: "rgba(0,212,255,0.04)",   duration: 28, delay: 0  },
  { x: "55%", y: "50%", size: 450, color: "rgba(124,58,237,0.05)",  duration: 35, delay: 5  },
  { x: "70%", y: "5%",  size: 380, color: "rgba(236,72,153,0.03)",  duration: 22, delay: 10 },
  { x: "20%", y: "65%", size: 320, color: "rgba(0,255,136,0.025)",  duration: 40, delay: 15 },
];

/* ─────────────────────────────────────
   Grid with parallax
───────────────────────────────────── */
const GridLines = () => (
  <div
    style={{
      position: "absolute", inset: 0,
      backgroundImage: `
        linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)
      `,
      backgroundSize: "72px 72px",
      pointerEvents: "none",
    }}
  />
);

/* ─────────────────────────────────────
   Main AnimatedBackground
───────────────────────────────────── */
const AnimatedBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const gridX = useTransform(mouseX, [0, window.innerWidth],  [-8, 8]);
  const gridY = useTransform(mouseY, [0, window.innerHeight], [-8, 8]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "linear-gradient(160deg, #070709 0%, #0a080f 40%, #080910 100%)",
      }}
    >
      {/* Parallax grid */}
      <motion.div style={{ x: gridX, y: gridY, position: "absolute", inset: "-20px" }}>
        <GridLines />
      </motion.div>

      {/* Neon glow orbs */}
      {ORBS.map((orb, i) => <GlowOrb key={i} {...orb} />)}

      {/* Floating code symbols */}
      {SYMBOLS_CONFIG.map((cfg, i) => (
        <FloatingSymbol key={i} symbol={cfg.symbol} style={cfg.style} />
      ))}

      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* Top vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, transparent 0%, rgba(0,0,0,0.6) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
};

export default AnimatedBackground;
