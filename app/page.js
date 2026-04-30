export default function Home() {
  return (
    <div className="page">


   <section style={styles.heroSplit}>

  {/* LEFT: IMAGE */}
  <div style={styles.heroImage}></div>

  {/* RIGHT: TEXT */}
  <div style={styles.heroContent}>

    <h1 style={styles.h1}>
      Welcome to Graceville International Christian Academy, Yaoundé
    </h1>

    <p style={styles.motto}>
      ✨ A Shining Light to the Nations — Matthew 5:16
    </p>

    <p style={styles.quote}>
      “Let your light so shine before men, that they may see your good works
      and glorify your Father in heaven.”
    </p>

    <div style={styles.cta}>
      <a href="/login" style={styles.primaryBtn}>
        Login
      </a>

      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSePPooFxqdYLX7V31EkAcwLNEwACrGbZabX9pSL0z7k7XKg-Q/viewform?usp=publish-editor"
        target="_blank"
        style={styles.secondaryBtn}
      >
        Apply for Admission
      </a>
    </div>

  </div>

</section>

      {/* INTRO SECTION */}
      <section id='about' className="section">
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

      {/* CAMBRIDGE SECTION */}
      <section className="section alt">
        <h2>Why Cambridge at Graceville?</h2>

        <p>
          Graceville offers the Cambridge International Curriculum from
          Cambridge Assessment International Education — a globally recognized
          pathway from Primary through A Levels.
        </p>

        <h3>We are committed to:</h3>

        <ol>
          <li>Strong Foundations: A robust yet flexible primary framework that prepares pupils for secondary success and the demands of a global world.</li>
          <li>Clear Academic Pathway: Progression through Cambridge Primary Checkpoint to IGCSE, Cambridge O Level, and Cambridge International AS & A Levels — qualifications respected by universities worldwide.</li>
          <li>Global + Local Relevance: A curriculum that meets international standards while honoring Cameroonian culture and context.</li>
          <li>Core Competency Development: Critical thinking, problem-solving, and confident communication in standard British English.</li>
          <li>Global Outlook: Learners appreciate international perspectives while valuing their local identity.</li>
          <li>Benchmarked Excellence: Consistent quality and standards through Cambridge’s international framework.</li>
        </ol>
      </section>

      {/* GOAL SECTION */}
      <section className="section">
        <h2>Our Goal</h2>

        <p>
          To develop learners who are confident, responsible, reflective,
          innovative, and actively engaged in the world around them.
        </p>

        <blockquote>
          “Train up a child in the way he should go, and when he is old he will not depart from it.” — Proverbs 22:6
        </blockquote>
      </section>

      {/* CORE SUBJECTS */}
      <section className="section alt">
        <h2>Core Subjects</h2>
        <p>
          English | Mathematics | Science | Art & Design | Computing & Digital Literacy |
          English as a Second Language | Global Perspectives | Humanities |
          Modern Foreign Languages | Music | Physical Education | Wellbeing
        </p>
      </section>

      {/* ADMISSIONS */}
      <section className="section admissions">
        <h2>Admissions 2026/2027</h2>

        <p>
          Registration opens: <strong>1 July 2026</strong>
        </p>

        <p>
          For more information, contact the numbers on your screen or send us a direct message.
        </p>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSePPooFxqdYLX7V31EkAcwLNEwACrGbZabX9pSL0z7k7XKg-Q/viewform?usp=publish-editor"
          target="_blank"
          className="primaryBtn"
        >
          Apply Now
        </a>
      </section>


    </div>
  );
}
const styles = {
  heroSplit: {
    display: "flex",
    minHeight: "80vh",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "40px",
    gap: "30px",
  },

  heroImage: {
    flex: 1,
    minHeight: "400px",
    backgroundImage: "url('/hero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "12px",
  },

  heroContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  h1: {
    fontSize: "42px",
    lineHeight: "1.2",
    margin: 0,
  },

  motto: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0b1f3a",
  },

  quote: {
    fontSize: "16px",
    opacity: 0.8,
    lineHeight: "1.6",
  },

  cta: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#0b1f3a",
    color: "white",
    padding: "10px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
  },

  secondaryBtn: {
    background: "#f5c542",
    color: "#000",
    padding: "10px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
  },
};
if (typeof window !== "undefined") {
  const style = document.createElement("style");

  style.innerHTML = `
    @media (max-width: 768px) {
      .heroSplit {
        flex-direction: column !important;
        padding: 20px !important;
        text-align: center;
      }

      .heroImage {
        width: 100% !important;
        min-height: 250px !important;
      }

      .heroContent h1 {
        font-size: 26px !important;
      }

      .heroContent {
        align-items: center;
      }

      .cta {
        justify-content: center;
      }
    }
  `;

  document.head.appendChild(style);
}