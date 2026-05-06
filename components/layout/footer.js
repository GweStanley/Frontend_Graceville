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
          <a href="/#about" style={styles.link}>About</a>
          <a href="/student-life" style={styles.link}>Campus Experience</a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSePPooFxqdYLX7V31EkAcwLNEwACrGbZabX9pSL0z7k7XKg-Q/viewform"
            target="_blank"
            rel="noreferrer"
            style={styles.linkHighlight}
          >
            Admissions
          </a>
        </div>

        {/* SOCIAL */}
        <div style={styles.social}>
          <p style={styles.sectionTitle}>Follow Us</p>

          <div style={styles.icons}>
            <a
              style={styles.iconLink}
              href="https://www.facebook.com/share/1C4SBK3a1v/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>

            <a
              style={styles.iconLink}
              href="https://www.instagram.com/gracevilleacademy?igsh=NDV6eGp2bTN0ZnM5&utm_source=ig_contact_invite"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              style={styles.iconLink}
              href="https://www.tiktok.com/@gracevilleacademy?_r=1&_t=ZS-963Foubv7h6"
              target="_blank"
              rel="noreferrer"
            >
              TikTok
            </a>
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
const styles = {
  footer: {
    backgroundColor: "#0b1f3a",
    color: "#fff",
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
    color: "#f5c542",
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
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    opacity: 0.85,
  },

  linkHighlight: {
    backgroundColor: "#f5c542",
    color: "#08172b",
    padding: "8px 12px",
    borderRadius: "6px",
    fontWeight: "600",
    textDecoration: "none",
    width: "fit-content",
  },

  social: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
  },

  icons: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  iconLink: {
    padding: "10px 12px",
    borderRadius: "8px",
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#fff",
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