import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Core (always loaded)
import Loader            from "./components/Loader";
import CustomCursor      from "./components/CustomCursor";
import ScrollProgress    from "./components/ScrollProgress";
import Navbar            from "./components/Navbar";
import Footer            from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";

// Sections (lazy-loaded for code splitting)
const ThreeBackground  = lazy(() => import("./components/ThreeBackground"));
const Hero             = lazy(() => import("./components/Hero"));
const About            = lazy(() => import("./components/About"));
const Skills           = lazy(() => import("./components/Skills"));
const DSASection       = lazy(() => import("./components/DSASection"));
const CodingProfiles   = lazy(() => import("./components/CodingProfiles"));
const Projects         = lazy(() => import("./components/Projects"));
const GitHubStats      = lazy(() => import("./components/GitHubStats"));
const Experience       = lazy(() => import("./components/Experience"));
const Education        = lazy(() => import("./components/Education"));
const Achievements     = lazy(() => import("./components/Achievements"));
const RecruiterHighlight = lazy(() => import("./components/RecruiterHighlight"));
const Contact          = lazy(() => import("./components/Contact"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <div className="relative">
        {/* Fixed 3D star-field background */}
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>

        {/* CSS animated background overlay (grid, orbs, symbols) */}
        <AnimatedBackground />

        {/* Cursor & progress */}
        <CustomCursor />
        <ScrollProgress />

        {/* Sticky Navbar */}
        <Navbar />

        {/* Page sections */}
        <main>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Hero />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <About />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <DSASection />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <CodingProfiles />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <GitHubStats />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <Experience />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <Education />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <Achievements />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <RecruiterHighlight />
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]" />}>
            <Contact />
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
