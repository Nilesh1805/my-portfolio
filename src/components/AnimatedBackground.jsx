import React, { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────
   Floating code symbols (pure CSS animation)
───────────────────────────────────────────── */
const CODE_SYMBOLS = ["</>", "{}", "()", "[]", "=>", "//", "&&", "||"];

const FloatingSymbol = ({ symbol, style }) => (
  <div
    className="floating-code-symbol"
    style={{
      position: "absolute",
      fontFamily: "'Space Grotesk', monospace",
      fontSize: style.fontSize,
      color: `rgba(255,255,255,${style.opacity})`,
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

/* ─────────────────────────────────────────────
   Gradient glow orbs (Framer Motion)
───────────────────────────────────────────── */
const GlowOrb = ({ x, y, size, color, duration, delay }) => (
  <motion.div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: "blur(80px)",
      left: x,
      top: y,
      pointerEvents: "none",
    }}
    animate={{
      x: [0, 60, -40, 20, 0],
      y: [0, -40, 30, -20, 0],
      scale: [1, 1.15, 0.9, 1.05, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/* ─────────────────────────────────────────────
   Main Canvas: particles + neural connections
───────────────────────────────────────────── */
const NeuralCanvas = ({ mouseX, mouseY }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Update mouse ref from motion values
  useEffect(() => {
    const unsubX = mouseX.on("change", (v) => { mouseRef.current.x = v; });
    const unsubY = mouseY.on("change", (v) => { mouseRef.current.y = v; });
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const initParticles = (W, H) => {
      particlesRef.current = Array.from({ length: 70 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.12 + 0.04,
        // parallax factor (subtle)
        px: (Math.random() - 0.5) * 0.015,
        py: (Math.random() - 0.5) * 0.015,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const CONNECT_DIST = 130;
    const MAX_CONNECTIONS = 3;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      const pts = particlesRef.current;

      // Update positions
      pts.forEach((p) => {
        // Gentle mouse parallax
        const dx = mx - W / 2;
        const dy = my - H / 2;
        p.x += p.vx + dx * p.px;
        p.y += p.vy + dy * p.py;

        // Wrap around edges
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });

      // Draw neural connections
      for (let i = 0; i < pts.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < pts.length; j++) {
          if (connections >= MAX_CONNECTIONS) break;
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.06;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(180,180,180,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }

      // Draw particles
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,200,200,${p.opacity})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

/* ─────────────────────────────────────────────
   Animated Grid Lines
───────────────────────────────────────────── */
const GridLines = () => (
  <div
    className="animated-grid"
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
      `,
      backgroundSize: "72px 72px",
      pointerEvents: "none",
    }}
  />
);

/* ─────────────────────────────────────────────
   Main AnimatedBackground Component
───────────────────────────────────────────── */
const SYMBOLS_CONFIG = CODE_SYMBOLS.map((sym, i) => ({
  symbol: sym,
  style: {
    fontSize: `${Math.random() * 10 + 10}px`,
    opacity: (Math.random() * 0.04 + 0.025).toFixed(3),
    left: `${(i / CODE_SYMBOLS.length) * 90 + 3}%`,
    top: `${Math.random() * 80 + 5}%`,
    duration: `${Math.random() * 12 + 14}s`,
    delay: `${Math.random() * -20}s`,
  },
}));

// Pre-generate orbs so they don't change on re-render
const ORBS = [
  { x: "5%",  y: "10%",  size: 500, color: "rgba(255,255,255,0.018)", duration: 28, delay: 0 },
  { x: "55%", y: "50%",  size: 400, color: "rgba(255,255,255,0.012)", duration: 35, delay: 5 },
  { x: "70%", y: "5%",   size: 350, color: "rgba(200,200,200,0.015)", duration: 22, delay: 10 },
  { x: "20%", y: "65%",  size: 300, color: "rgba(255,255,255,0.010)", duration: 40, delay: 15 },
];

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

  // Gentle parallax for the grid
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
        background: "linear-gradient(160deg, #080808 0%, #0d0d0d 40%, #101010 100%)",
      }}
    >
      {/* Grid */}
      <motion.div
        style={{ x: gridX, y: gridY, position: "absolute", inset: "-20px" }}
      >
        <GridLines />
      </motion.div>

      {/* Glow Orbs */}
      {ORBS.map((orb, i) => (
        <GlowOrb key={i} {...orb} />
      ))}

      {/* Canvas: particles + neural connections */}
      <NeuralCanvas mouseX={mouseX} mouseY={mouseY} />

      {/* Floating Code Symbols */}
      {SYMBOLS_CONFIG.map((cfg, i) => (
        <FloatingSymbol key={i} symbol={cfg.symbol} style={cfg.style} />
      ))}

      {/* Top vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
};

export default AnimatedBackground;
