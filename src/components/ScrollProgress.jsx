import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9997] h-[3px] bg-transparent">
      <motion.div
        className="h-full rounded-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(to right, #00d4ff, #7c3aed, #ec4899)",
          boxShadow: "0 0 8px rgba(0,212,255,0.8)",
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

export default ScrollProgress;
