export default function StudentLife() {
  return (
    <div style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.overlay}>

          <h1 style={styles.heroTitle}>
            Student Life at Graceville
          </h1>

          <p style={styles.heroText}>
            A vibrant journey of learning, faith, creativity, and personal growth.
          </p>


        </div>
      </section>

      {/* SPIRITUAL LIFE */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Spiritual Life at Graceville</h2>

        <p style={styles.intro}>
          Graceville International Christian Academy is built on strong Christian values that guide teaching and character development.
        </p>

        <div style={styles.grid}>

          <div style={styles.card}>
            <h3>🙏 Daily Faith Practices</h3>
            <ul>
              <li>Daily prayers</li>
              <li>Morning devotions</li>
              <li>Moral instruction</li>
              <li>Christian fellowship</li>
            </ul>
          </div>

          <div style={styles.card}>
            <h3>✨ Our Mission in Faith</h3>
            <p>
              We aim to raise children who are academically sound and spiritually grounded with strong moral values.
            </p>
          </div>

          <div style={styles.card}>
            <h3>📖 Scripture Foundation</h3>
            <p>
              “Train up a child in the way he should go...” — Proverbs 22:6
            </p>
          </div>

        </div>
      </section>

      {/* STUDENT ACTIVITIES */}
      <section style={{ ...styles.section, backgroundColor: "#f5f7fb" }}>
        <h2 style={styles.h2}>Student Life & Activities</h2>

        <p style={styles.paragraph}>
          Learning goes beyond the classroom. We build a vibrant environment where students thrive socially, emotionally, and physically.
        </p>

        <div style={styles.activities}>

          {activities.map((item, i) => (
            <div key={i} style={styles.activityCard}>
              <img src={item.img} style={styles.activityImage} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}

        </div>
      </section>

      {/* LIFE BEYOND */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Life Beyond the Classroom</h2>

        <div style={styles.split}>

          <div>
            <p style={styles.paragraph}>
              At Graceville, we design a holistic environment for academic, social, emotional, and spiritual growth.
            </p>

            <ul>
              <li>Safe and nurturing environment</li>
              <li>Strong student-teacher relationships</li>
              <li>Leadership development</li>
              <li>Community and belonging</li>
            </ul>
          </div>

          <img
            src="/GenInforGraphix.jpeg"
            style={styles.sideImage}
          />

        </div>
      </section>

    </div>
  );
}

/* ================= INLINE STYLES ================= */

const activities = [
  { img: "/sports.jpg", title: "Sports", text: "Teamwork, discipline, physical excellence." },
  { img: "/music.jpg", title: "Music", text: "Creativity, worship, artistic expression." },
  { img: "/arts.jpg", title: "Arts & Crafts", text: "Imagination and hands-on skills." },
  { img: "/swimming.jpg", title: "Swimming", text: "Confidence and physical development." },
  { img: "/clubs.jpg", title: "Clubs & Societies", text: "Leadership and collaboration." },
];

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    color: "#1a1a1a",
  },

  /* HERO */
  hero: {
    backgroundImage: "url('/student_class.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "70vh",
    position: "relative",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.65)",
    color: "white",
    padding: "60px 30px",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  heroTitle: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  heroText: {
    fontSize: "18px",
    maxWidth: "600px",
    marginBottom: "20px",
  },

  heroImageBox: {
    marginTop: "20px",
  },

  heroImage: {
    width: "120px",
    borderRadius: "10px",
  },

  /* SECTIONS */
  section: {
    padding: "60px 30px",
  },

  h2: {
    fontSize: "28px",
    marginBottom: "15px",
  },

  intro: {
    maxWidth: "700px",
    marginBottom: "30px",
  },

  paragraph: {
    maxWidth: "700px",
    lineHeight: "1.6",
  },

  /* GRID */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  /* ACTIVITIES */
  activities: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  activityCard: {
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    padding: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  activityImage: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },

  /* SPLIT SECTION */
  split: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    alignItems: "center",
  },

  sideImage: {
    width: "100%",
    borderRadius: "10px",
  },
};