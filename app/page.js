export default function Home() {
  return (
    <div className="page">


      <section className="heroSplit">

  {/* LEFT: IMAGE */}
  <div className="heroImage"></div>

  {/* RIGHT: TEXT */}
  <div className="heroContent">

    <h1>
      Welcome to Graceville International Christian Academy, Yaoundé
    </h1>

    <p className="motto">
      ✨ A Shining Light to the Nations — Matthew 5:16
    </p>

    <p className="quote">
      “Let your light so shine before men, that they may see your good works
      and glorify your Father in heaven.”
    </p>

    <div className="heroCTA">
      <a href="/login" className="primaryBtn">Login</a>

      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSePPooFxqdYLX7V31EkAcwLNEwACrGbZabX9pSL0z7k7XKg-Q/viewform?usp=publish-editor"
        target="_blank"
        className="secondaryBtn"
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