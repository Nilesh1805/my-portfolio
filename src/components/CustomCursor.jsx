import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────
   Trail dot pool
───────────────────────────────────── */
const TRAIL_LENGTH = 16;

const CustomCursor = () => {
  const cursorRef    = useRef(null);
  const followerRef  = useRef(null);
  const trailRefs    = useRef([]);
  const pos          = useRef({ x: -100, y: -100 });
  const followerPos  = useRef({ x: -100, y: -100 });
  const trail        = useRef(Array(TRAIL_LENGTH).fill({ x: -100, y: -100 }));
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible]   = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onEnter = (e) => {
      if (
        e.target.closest("a, button, [role='button'], input, textarea, select, label, .cursor-pointer")
      ) setHovering(true);
    };
    const onLeave = () => setHovering(false);

    window.addEventListener("mousemove", onMove,    { passive: true });
    document.addEventListener("mouseover",  onEnter, { passive: true });
    document.addEventListener("mouseout",   onLeave, { passive: true });

    // Animation loop
    const tick = () => {
      // Smoothly follow main cursor
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;

      // Main dot
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Follower ring
      if (followerRef.current) {
        followerRef.current.style.transform =
          `translate(${followerPos.current.x - 16}px, ${followerPos.current.y - 16}px)`;
      }

      // Trail: shift history
      trail.current = [{ ...pos.current }, ...trail.current.slice(0, TRAIL_LENGTH - 1)];

      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = trail.current[i];
        const scale = 1 - i / TRAIL_LENGTH;
        const opacity = (1 - i / TRAIL_LENGTH) * 0.45;
        el.style.transform = `translate(${t.x - 3}px, ${t.y - 3}px) scale(${scale})`;
        el.style.opacity = String(opacity);
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: 6, height: 6,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#7c3aed" : "#ec4899",
            pointerEvents: "none",
            zIndex: 9997,
            willChange: "transform, opacity",
            transition: "opacity 0.05s",
          }}
        />
      ))}

      {/* Follower ring */}
      <div
        ref={followerRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderRadius: "50%",
          border: hovering ? "2px solid #ec4899" : "2px solid rgba(0,212,255,0.6)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "border-color 0.2s, width 0.2s, height 0.2s",
          boxShadow: hovering
            ? "0 0 12px #ec489980, 0 0 24px #ec489940"
            : "0 0 8px rgba(0,212,255,0.4)",
        }}
      />

      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          background: hovering ? "#ec4899" : "#00d4ff",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          boxShadow: hovering
            ? "0 0 8px #ec4899, 0 0 16px #ec489980"
            : "0 0 8px #00d4ff, 0 0 16px #00d4ff80",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
      />
    </>
  );
};

export default CustomCursor;
