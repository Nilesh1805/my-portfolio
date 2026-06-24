import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiSend, FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";

const socialLinks = [
  { icon: <FiGithub size={20} />,     label: "GitHub",        href: "https://github.com/Nilesh1805",                            color: "#e2e8f0" },
  { icon: <FiLinkedin size={20} />,   label: "LinkedIn",      href: "https://www.linkedin.com/in/nilesh-rajbhar-483371274/",    color: "#0a66c2" },
  { icon: <SiGeeksforgeeks size={20}/>, label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/profile/nileshr071e",       color: "#2f8d46" },
  { icon: <SiLeetcode size={20} />,   label: "LeetCode",      href: "https://leetcode.com/u/Nilesh180905/",                    color: "#ffa116" },
  { icon: <FiMail size={20} />,       label: "Email",         href: "mailto:nileshraj18a1@gmail.com",                          color: "#00d4ff" },
];

const contactInfo = [
  { icon: <FiMapPin size={16} />,  text: "Lucknow, Uttar Pradesh, India" },
  { icon: <FiMail size={16} />,    text: "nileshraj18a1@gmail.com"        },
];

/* ─────────────────────────────────────
   Success Confetti
───────────────────────────────────── */
const SuccessOverlay = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center z-20"
    style={{ background: "rgba(6,15,30,0.97)", backdropFilter: "blur(10px)" }}
  >
    {[...Array(16)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{ background: ["#00d4ff", "#7c3aed", "#ec4899", "#00ff88"][i % 4] }}
        initial={{ x: 0, y: 0, opacity: 1 }}
        animate={{
          x: (Math.random() - 0.5) * 260,
          y: (Math.random() - 0.5) * 260,
          opacity: 0,
          scale: [1, 1.5, 0],
        }}
        transition={{ duration: 1, delay: i * 0.04 }}
      />
    ))}
    <motion.div
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.5 }}
      className="text-6xl mb-4"
    >
      ✅
    </motion.div>
    <h3 className="font-space font-bold text-2xl text-white mb-2">Message Sent!</h3>
    <p className="text-slate-400 text-sm text-center max-w-xs">
      Thanks for reaching out, Nilesh will reply as soon as possible.
    </p>
  </motion.div>
);

/* ─────────────────────────────────────
   Input Field
───────────────────────────────────── */
const FormField = ({ label, name, type = "text", placeholder, value, onChange, required, rows }) => {
  const [focused, setFocused] = useState(false);
  const focusStyle = {
    borderColor: focused ? "rgba(0,212,255,0.5)" : "rgba(0,212,255,0.12)",
    boxShadow:   focused ? "0 0 20px rgba(0,212,255,0.12)" : "none",
    background:  "rgba(255,255,255,0.03)",
    transition:  "all 0.25s ease",
  };

  const common = {
    name, value, onChange, required,
    placeholder,
    id: `contact-${name}`,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none",
    style: { ...focusStyle, border: `1px solid ${focused ? "rgba(0,212,255,0.4)" : "rgba(0,212,255,0.12)"}` },
  };

  return (
    <div>
      <label className="block text-sm text-slate-400 mb-1.5 font-medium">{label}</label>
      {rows ? (
        <textarea {...common} rows={rows} style={{ ...common.style, resize: "none" }} />
      ) : (
        <input type={type} {...common} />
      )}
    </div>
  );
};

/* ─────────────────────────────────────
   Main Contact Section
───────────────────────────────────── */
const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm]           = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus]       = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg]   = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // EmailJS keys from .env — fill these in your .env file
    const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID  || "YOUR_SERVICE_ID";
    const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY  || "YOUR_PUBLIC_KEY";

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg("Oops! Something went wrong. Please try again or email directly.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      style={{ background: "linear-gradient(180deg, rgba(10,8,20,0.97) 0%, rgba(5,3,10,0.98) 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute right-0 top-0 w-80 h-80 opacity-[0.06] blur-3xl rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }} />
      <div className="absolute left-0 bottom-0 w-64 h-64 opacity-[0.05] blur-3xl rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3 font-mono">
            Get In Touch
          </p>
          <h2 className="section-heading text-white mb-4">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Whether you have an opportunity, a project idea, or just want to say hi — my inbox is always open!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Info ── */}
          <motion.div data-aos="fade-right" className="space-y-6">

            {/* Intro card */}
            <div className="glass-card rounded-3xl p-8" style={{ border: "1px solid rgba(0,212,255,0.15)", boxShadow: "0 0 40px rgba(0,212,255,0.05)" }}>
              <h3 className="font-space font-bold text-2xl text-white mb-3">
                Let's <span className="gradient-text">Build Together</span>
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                I'm actively seeking internship opportunities and exciting projects. Passionate about Full Stack, AI/ML and building impactful solutions.
              </p>

              {/* Contact info */}
              <div className="space-y-3 mb-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <span className="text-cyan-400">{info.icon}</span>
                    <span className="text-sm">{info.text}</span>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-3 font-mono">Find me on</p>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -4 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-11 h-11 rounded-xl glass-card flex items-center justify-center transition-all"
                      style={{ border: `1px solid ${s.color}30`, color: s.color }}
                      aria-label={s.label}
                      id={`social-${s.label.toLowerCase().replace(/\s/g, "-")}-btn`}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Download Resume */}
            <motion.a
              href="https://drive.google.com/file/d/1ghbNJxogekyeEqbiyitWIBgvh40wOIsf/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-6 glass-card rounded-2xl cursor-pointer group"
              style={{ border: "1px solid rgba(124,58,237,0.25)", boxShadow: "0 0 20px rgba(124,58,237,0.06)" }}
              id="download-resume-contact-btn"
            >
              <div>
                <h4 className="font-space font-bold text-white mb-1">Download My Resume</h4>
                <p className="text-slate-400 text-sm">Get a PDF copy of my full resume</p>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
              >
                <FiDownload className="text-white" size={20} />
              </div>
            </motion.a>
          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div data-aos="fade-left">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-8 space-y-5 relative overflow-hidden"
              style={{ border: "1px solid rgba(0,212,255,0.12)" }}
              id="contact-form"
            >
              <AnimatePresence>
                {status === "success" && <SuccessOverlay />}
              </AnimatePresence>

              <h3 className="font-space font-bold text-xl text-white mb-2">Send a Message</h3>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Your Name"  name="name"  placeholder="Nilesh Rajbhar"    value={form.name}  onChange={handleChange} required />
                <FormField label="Your Email" name="email" placeholder="you@example.com"   value={form.email} onChange={handleChange} required type="email" />
              </div>

              <FormField label="Subject" name="subject" placeholder="Internship / Collaboration" value={form.subject} onChange={handleChange} required />
              <FormField label="Message" name="message" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} required rows={5} />

              {/* Error message */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === "loading"}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
                id="send-message-btn"
              >
                {status === "loading" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={16} /> Send Message
                  </>
                )}
              </motion.button>

              {/* EmailJS note */}
              <p className="text-slate-600 text-xs text-center font-mono">
                Powered by EmailJS · Secure & Direct
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
