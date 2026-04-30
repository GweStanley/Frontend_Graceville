"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    setSuccess("Message sent successfully. We will get back to you.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contactPage">

      {/* HEADER */}
      <div className="contactHeader">
        <h1>Contact Us</h1>
        <p>Reach out for admissions, inquiries, or support</p>
      </div>

      {/* MAIN GRID */}
      <div className="contactGrid">

        {/* LEFT: INFO */}
        <div className="contactInfo">
          <h3>Graceville International Christian Academy</h3>

          <p><strong>Location:</strong> Yaoundé, Cameroon</p>
          <p><strong>Phone:</strong> +237 XXX XXX XXX</p>
          <p><strong>Email:</strong> info@graceville.edu</p>

          <p className="note">
            Admissions for 2026/2027 open from 1 July 2026.
          </p>

          {/* WHATSAPP BUTTON */}
          <a
            href="https://wa.me/237XXXXXXXXX"
            target="_blank"
            className="whatsappBtn"
          >
            Chat with us on WhatsApp
          </a>
        </div>

        {/* RIGHT: FORM */}
        <form className="contactForm" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>

          {success && <p className="success">{success}</p>}
        </form>
      </div>

      {/* MAP */}
      <div className="mapSection">
        <iframe
          src="https://www.google.com/maps?q=Yaoundé%20Cameroon&output=embed"
          loading="lazy"
        ></iframe>
      </div>

    </div>
  );
}