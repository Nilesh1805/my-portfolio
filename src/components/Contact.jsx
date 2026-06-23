import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiDownload, FiGithub, FiLinkedin, FiMail, FiInstagram, FiMapPin, FiPhone } from "react-icons/fi";

const socialLinks = [
  { icon: <FiGithub size={20} />, label: "GitHub", href: "https://github.com/Nilesh1805", color: "#e2e8f0" },
  { icon: <FiLinkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/nilesh-rajbhar-483371274/", color: "#0a66c2" },
  { icon: <FiMail size={20} />, label: "Email", href: "mailto:nileshraj18a1@gmail.com", color: "#00d4ff" },
  { icon: <FiInstagram size={20} />, label: "Instagram", href: "https://instagram.com/nilesh_rajbhar", color: "#e4405f" },
];

const contactInfo = [
  { icon: <FiMapPin size={16} />, text: "Lucknow, Uttar Pradesh, India" },
  { icon: <FiMail size={16} />, text: "nileshraj18a1@gmail.com" },
  { icon: <FiPhone size={16} />, text: "Available on Request" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.94) 0%, rgba(8,8,8,0.96) 100%)" }}>
      {/* Decorative blobs */}
      <div className="absolute right-0 top-0 w-96 h-96 opacity-10 blur-3xl rounded-full"
        style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">Get In Touch</p>
          <h2 className="section-heading text-white mb-4">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #00d4ff, #7c3aed)" }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Whether you have an opportunity, a project idea, or just want to say hi — my inbox is always open!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <motion.div data-aos="fade-right" className="space-y-8">
            {/* Intro Card */}
            <div className="glass-card rounded-3xl p-8 neon-glow-blue">
              <h3 className="font-space font-bold text-2xl text-white mb-3">
                Let's <span className="gradient-text">Build Together</span>
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                I'm currently looking for internship opportunities and exciting projects to collaborate on.
                If you're interested in working together or have any questions, feel free to reach out!
              </p>

              {/* Contact Details */}
              <div className="space-y-3 mb-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <span className="text-cyan-400">{info.icon}</span>
                    <span className="text-sm">{info.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">Find me on</p>
                <div className="flex gap-3">
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
                      id={`social-${s.label.toLowerCase()}-btn`}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Download Resume */}
            <motion.a
              href="/resume.pdf"
              download="Nilesh_Rajbhar_Resume.pdf"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-6 glass-card rounded-2xl neon-glow-purple cursor-pointer group"
              id="download-resume-contact-btn"
            >
              <div>
                <h4 className="font-space font-bold text-white mb-1">Download My Resume</h4>
                <p className="text-slate-400 text-sm">Get a PDF copy of my full resume</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}>
                <FiDownload className="text-white" size={20} />
              </div>
            </motion.a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div data-aos="fade-left">
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-8 space-y-5"
              id="contact-form"
            >
              <h3 className="font-space font-bold text-xl text-white mb-2">Send a Message</h3>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "name", label: "Your Name", placeholder: "Nilesh Rajbhar", type: "text" },
                  { name: "email", label: "Your Email", placeholder: "you@example.com", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm text-slate-400 mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      id={`contact-${field.name}`}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all focus:ring-2"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(0,212,255,0.15)",
                        focusRingColor: "#00d4ff",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#00d4ff50"; e.target.style.boxShadow = "0 0 15px rgba(0,212,255,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.15)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                ))}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Internship Opportunity / Project Collaboration"
                  required
                  id="contact-subject"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
                  onFocus={(e) => { e.target.style.borderColor = "#00d4ff50"; e.target.style.boxShadow = "0 0 15px rgba(0,212,255,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.15)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  id="contact-message"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
                  onFocus={(e) => { e.target.style.borderColor = "#00d4ff50"; e.target.style.boxShadow = "0 0 15px rgba(0,212,255,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.15)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
                id="send-message-btn"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : submitted ? (
                  <span className="text-green-300">✓ Message Sent Successfully!</span>
                ) : (
                  <>
                    <FiSend size={16} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
