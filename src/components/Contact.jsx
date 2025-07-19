import React, { useState } from "react";
import { Mail, Phone, Linkedin, Github, Send, CheckCircle } from "lucide-react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_API_KEY;
    const serviceKey = import.meta.env.VITE_SERVICE_API_KEY;
    const templateKey = import.meta.env.VITE_TEMPLATE_API_KEY;

    if (formData.name && formData.email && formData.message) {
      setIsSending(true);

      emailjs
        .send(
          
          serviceKey,
          
          templateKey,
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          apiKey
        )
        .then(() => {
          setFormData({ name: "", email: "", message: "" });
          setIsSending(false);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000); // Hide toast after 3s
        })
        .catch((error) => {
          console.error("FAILED...", error);
          setIsSending(false);
          alert("Failed to send message. Please try again.");
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* ✅ Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn z-50">
          <CheckCircle size={18} />
          <span>Message sent successfully!</span>
        </div>
      )}

      {/* Heading */}
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Mail className="text-blue-400" size={24} />
        Get In Touch
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300">
          <h3 className="text-lg font-bold text-white mb-6 text-center">
            Contact Information
          </h3>
          <div className="space-y-4">
            <a
              href="https://wa.me/919665542046"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <Phone size={16} className="text-blue-400" />
              <span>+91-9665542046</span>
            </a>
            <a href="mailto:lawhares@gmail.com" className="contact-link">
              <Mail size={16} className="text-blue-400" />
              <span>lawhares@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sudhanshu-lawhare"
              target="_blank"
              className="contact-link"
            >
              <Linkedin size={16} className="text-blue-400" />
              <span>LinkedIn Profile</span>
            </a>
            <a
              href="https://github.com/Shu-50"
              target="_blank"
              className="contact-link"
            >
              <Github size={16} className="text-blue-400" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300">
          <h3 className="text-lg font-bold text-white mb-6 text-center">
            Send Message
          </h3>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="form-input"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="form-input"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="form-input resize-none"
            />
            <button
              type="submit"
              disabled={isSending}
              className={`w-full ${
                isSending
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 neon-glow`}
            >
              <Send size={16} />
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
