import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(135deg, #050505, #0f0f0f, #141414)" }}
      >
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="w-24 h-24 rounded-2xl glass-card flex items-center justify-center neon-glow-blue"
          >
            <span className="gradient-text font-space font-bold text-4xl">N</span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-space font-bold text-3xl text-white mb-1">Nilesh Rajbhar</h1>
            <p className="text-sm" style={{ color: "#94a3b8" }}>Loading Portfolio...</p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "280px" }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-72 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full loader-bar rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="text-xs" style={{ color: "#94a3b8" }}>{Math.min(Math.round(progress), 100)}%</span>
          </motion.div>

          {/* Orbiting dots */}
          <div className="relative w-16 h-16">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ["#00d4ff", "#7c3aed", "#ec4899"][i],
                  top: "50%", left: "50%",
                  originX: "0px", originY: "0px",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                  repeatType: "loop",
                }}
                initial={{ rotate: i * 120, translateX: 28, translateY: -6 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
