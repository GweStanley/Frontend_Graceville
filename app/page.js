"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const slides = [
    {
      image: "/GenInforGraphix.jpeg",
      title: "Welcome to Graceville International Christian Academy, Yaoundé",
      text: "✨ A Shining Light to the Nations — Matthew 5:16",
      sub: "Raising globally minded, Christ-centered learners."
    },
    {
      image: "/library.jpeg",
      title: "Academic Excellence with Cambridge Curriculum",
      text: "From Primary to A Levels",
      sub: "Globally recognized. Locally grounded."
    },
    {
      image: "/diverse.jpeg",
      title: "Faith • Character • Leadership",
      text: "We nurture the whole child",
      sub: "Academic, spiritual, and personal growth."
    },
        {
      image: "/music.jpg",
      title: "Talent • Development • Creativity",
      text: "We nurture natural talents",
      sub: "Musical development, sports etc"
    }

  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">

      {/* ================= HERO CAROUSEL ================= */}
      <section className="carousel">

        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slide ${i === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="overlay">

              <div className="content">
                <h1>{slide.title}</h1>
                <p className="motto">{slide.text}</p>
                <p className="sub">{slide.sub}</p>

                <div className="heroCTA">
                  <a href="/login" className="primaryBtn">Login</a>

                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSePPooFxqdYLX7V31EkAcwLNEwACrGbZabX9pSL0z7k7XKg-Q/viewform"
                    target="_blank"
                    className="secondaryBtn"
                  >
                    Apply for Admission
                  </a>
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* DOTS */}
        <div className="controls">
          {slides.map((_, i) => (
            <span
              key={i}
              className={i === index ? "dot activeDot" : "dot"}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

      </section>

      {/* ================= INTRO ================= */}
      <section id="about" className="section">
        <h2>🎯 Our Mission</h2>
        <p>
          To equip learners for global influence through academic excellence,
          character development, and the transformative power of God’s love.
        </p>

        <h2>🌍 Our Vision</h2>
        <p>
          To raise a generation of graduates who lead with excellence, integrity,
          and compassion — reflecting the heart of Christ in every nation and every sphere of influence.
        </p>
      </section>

      {/* ================= CAMBRIDGE ================= */}
      <section className="section alt">
        <h2>Why Cambridge at Graceville?</h2>

        <p>
          Graceville offers the Cambridge International Curriculum from
          Cambridge Assessment International Education — a globally recognized
          pathway from Primary through A Levels.
        </p>

        <h3>We are committed to:</h3>

        <ol>
          <li>Strong Foundations: A robust yet flexible primary framework.</li>
          <li>Clear Academic Pathway: From Checkpoint to A Levels.</li>
          <li>Global + Local Relevance: International standards with local context.</li>
          <li>Core Competency Development: Critical thinking & communication.</li>
          <li>Global Outlook: Appreciating international perspectives.</li>
          <li>Benchmarked Excellence: Consistent global standards.</li>
        </ol>
      </section>

      {/* ================= GOAL ================= */}
      <section className="section">
        <h2>Our Goal</h2>

        <p>
          To develop learners who are confident, responsible, reflective,
          innovative, and actively engaged in the world around them.
        </p>

        <blockquote>
          “Train up a child in the way he should go...” — Proverbs 22:6
        </blockquote>
      </section>

      {/* ================= SUBJECTS ================= */}
      <section className="section alt">
        <h2>Core Subjects</h2>
        <p>
          English | Mathematics | Science | Art & Design | Computing |
          ESL | Global Perspectives | Humanities |
          Languages | Music | Physical Education | Wellbeing
        </p>
      </section>

      {/* ================= ADMISSIONS ================= */}
      <section className="section admissions">
        <h2>Admissions 2026/2027</h2>

        <p>
          Registration opens: <strong>1 July 2026</strong>
        </p>

        <p>
          For more information, contact the numbers on your screen or send us a direct message.
        </p>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSePPooFxqdYLX7V31EkAcwLNEwACrGbZabX9pSL0z7k7XKg-Q/viewform"
          target="_blank"
          className="primaryBtn"
        >
          Apply Now
        </a>
      </section>

    </div>
  );
}