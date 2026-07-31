import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "emailjs-com";
import SectionHeader from "./ui/SectionHeader";
import { useContent } from "../context/ContentContext";
import { Reveal, EASE } from "./ui/motion";

const Contact = () => {
  const { content } = useContent();
  const c = content.contact || {};

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState(null); // { type, text }

  const notify = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return notify("error", "Please fill in all fields.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return notify("error", "That email doesn't look right.");
    }

    const apiKey = import.meta.env.VITE_API_KEY;
    const serviceKey = import.meta.env.VITE_SERVICE_API_KEY;
    const templateKey = import.meta.env.VITE_TEMPLATE_API_KEY;

    setIsSending(true);
    emailjs
      .send(serviceKey, templateKey, { ...formData }, apiKey)
      .then(() => {
        setFormData({ name: "", email: "", message: "" });
        notify("success", "Message sent successfully!");
      })
      .catch((error) => {
        console.error("FAILED...", error);
        notify("error", "Failed to send. Please try again.");
      })
      .finally(() => setIsSending(false));
  };

  const links = [
    { href: c.whatsapp, icon: Phone, label: c.phone },
    { href: c.email ? `mailto:${c.email}` : null, icon: Mail, label: c.email },
    { href: c.linkedin, icon: Linkedin, label: "LinkedIn Profile" },
    { href: c.github, icon: Github, label: "GitHub Profile" },
  ].filter((l) => l.href && l.label);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={`fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-[100] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm font-medium ${
              toast.type === "success" ? "bg-emerald-500 text-black" : "bg-red-500 text-white"
            }`}
          >
            {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>

      <SectionHeader icon={Mail} title="Get In Touch" subtitle="Open to internships and roles" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Reveal>
          <div className="h-full glass rounded-2xl p-5 sm:p-6 card-glow">
            <h3 className="text-lg font-bold text-white mb-5">Contact Information</h3>
            <div className="space-y-3">
              {links.map(({ href, icon: Icon, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Icon size={16} className="text-sky-400 shrink-0" />
                  <span className="break-all">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full glass rounded-2xl p-5 sm:p-6 card-glow">
            <h3 className="text-lg font-bold text-white mb-5">Send Message</h3>
            <form onSubmit={handleFormSubmit} className="space-y-3.5" noValidate>
              <input
                type="text"
                placeholder="Your Name"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
              <input
                type="email"
                placeholder="Your Email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="form-input resize-none"
              />
              <button
                type="submit"
                disabled={isSending}
                className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                  isSending
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-black neon-glow"
                }`}
              >
                <Send size={16} className={isSending ? "animate-pulse" : ""} />
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Contact;
