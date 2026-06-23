import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let animFrame;
    let targetX = 0, targetY = 0;

    const handleMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setDotPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.12,
        y: prev.y + (targetY - prev.y) * 0.12,
      }));
      animFrame = requestAnimationFrame(animate);
    };

    const handleHover = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMove);
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    animFrame = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animFrame);
    };
  }, [isVisible]);

  if (window.innerWidth < 768) return null;

  return (
    <>
      {/* Ring (lagging) */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: position.x - (isHovering ? 24 : 16),
          top: position.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: "50%",
          border: "2px solid #00d4ff",
          boxShadow: "0 0 10px rgba(0,212,255,0.5)",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, left 0s, top 0s",
          mixBlendMode: "screen",
        }}
      />
      {/* Dot (instant) */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: dotPosition.x - 4,
          top: dotPosition.y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#00d4ff",
          boxShadow: "0 0 6px #00d4ff",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />
    </>
  );
};

export default CustomCursor;
