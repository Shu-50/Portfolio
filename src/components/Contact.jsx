import React, { useState } from "react";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";
import emailjs from "emailjs-com";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.message) {
      emailjs
        .send(
          "service_04z1i4z", // ✅ Replace with your actual EmailJS service ID
          "template_a2lz8zf", // ✅ Replace with your actual EmailJS template ID
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          "cFb7aAGIrd1kc4lKF" // ✅ Replace with your actual EmailJS public key
        )
        .then(
          () => {
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
          },
          (error) => {
            console.error("FAILED...", error);
            alert("Failed to send message. Please try again.");
          }
        );
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Mail className="text-blue-400" size={24} />
        Get In Touch
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-2xl hover:border-blue-500/50 transition-all duration-300">
          <h3 className="text-lg font-bold text-white mb-6 text-center">
            Contact Information
          </h3>
          <div className="space-y-4">
            <a
              href="https://wa.me/919665542046"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors text-sm p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500/50"
            >
              <Phone size={16} className="text-blue-400" />
              <span>+91-9665542046</span>
            </a>
            <a
              href="mailto:lawhares@gmail.com"
              target="_blank"
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors text-sm p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500/50"
            >
              <Mail size={16} className="text-blue-400" />
              <span>lawhares@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sudhanshu-lawhare"
              target="_blank"
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors text-sm p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500/50"
            >
              <Linkedin size={16} className="text-blue-400" />
              <span>LinkedIn Profile</span>
            </a>
            <a
              href="https://github.com/Shu-50"
              target="_blank"
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors text-sm p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500/50"
            >
              <Github size={16} className="text-blue-400" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>

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
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-sm transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-sm transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none text-sm transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 neon-glow"
            >
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
