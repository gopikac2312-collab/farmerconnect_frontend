import React, { useState } from "react";
import "../styles/Contact.css"; // <-- Add this line

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          {/* Email */}
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          {/* Message */}
          <label>Message</label>
          <textarea
            name="message"
            rows="4"
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Enter your message"
          ></textarea>

          {/* Submit */}
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}
