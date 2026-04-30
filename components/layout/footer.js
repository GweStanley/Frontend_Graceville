export default function Footer() {
  return (
    <footer style={styles.footer}>

      <div style={styles.container}>

        {/* BRAND */}
        <div style={styles.brand}>
          <h3 style={styles.h3}>Graceville International School</h3>
          <p style={styles.text}>A Shining Light to the Nations</p>
        </div>

        {/* LINKS */}
        <div style={styles.links}>
          <a href="/#about">About</a>
          <a href="/student-life">Campus Experiebce</a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSePPooFxqdYLX7V31EkAcwLNEwACrGbZabX9pSL0z7k7XKg-Q/viewform"
            target="_blank"
            rel="noreferrer"
          >
            Admissions
          </a>
        </div>

        {/* SOCIAL */}
        <div style={styles.social}>
          <p style={styles.text}>Follow Us</p>

          <div style={styles.icons}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div style={styles.bottom}>
        © {new Date().getFullYear()} Graceville International Christian Academy
      </div>

    </footer>
  );
}

/* ================= INLINE STYLES ================= */

const styles = {
  footer: {
    backgroundColor: "#406da0", // darker than navbar → no clash
    color: "#ffffff",
    marginTop: "60px",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    padding: "40px 60px",
  },

  brand: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  h3: {
    margin: 0,
    fontSize: "18px",
    color: "#f5c542", // gold accent for identity
  },

  text: {
    margin: 0,
    fontSize: "14px",
    opacity: 0.85,
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "14px",
    opacity: 0.85,
  },

  linkHighlight: {
    color: "#08172b",
    backgroundColor: "#f5c542",
    padding: "6px 10px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "600",
    width: "fit-content",
  },

  social: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
  },

  iconRow: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  socialLink: {
    color: "#ffffff",
    opacity: 0.8,
    textDecoration: "none",
    fontSize: "14px",
  },

  bottom: {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
    padding: "15px",
    fontSize: "13px",
    opacity: 0.7,
  },
};