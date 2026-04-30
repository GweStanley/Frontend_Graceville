"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // AUTH SYNC
  const syncUser = () => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  };

  useEffect(() => {
    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setOpen(false);

    router.push("/login");
  };

  return (
    <>
      <nav style={styles.nav}>

        {/* LEFT */}
        <div style={styles.left}>
          <img src="/logo.png" style={styles.logo} />
          <span style={styles.brand}>Graceville</span>
        </div>

        {/* HAMBURGER (MOBILE ONLY) */}
        <div
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* DESKTOP MENU */}
        <div style={styles.center}>
          <Link href="/">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/student-life">Student Life</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>

          {!user ? (
            <Link href="/login" style={styles.loginBtn}>
              Login
            </Link>
          ) : (
            <div style={styles.userWrapper}>

              <div
                style={styles.userBtn}
                onClick={() => setOpen(!open)}
              >
                👤 {user.name?.split(" ")[0]}
              </div>

              {open && (
                <div style={styles.dropdown}>
                  <Link
                    href={`/${user.role}/dashboard`}
                    style={styles.dropItem}
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    style={styles.logoutBtn}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSePPooFxqdYLX7V31EkAcwLNEwACrGbZabX9pSL0z7k7XKg-Q/viewform?usp=publish-editor"
            target="_blank"
            rel="noreferrer"
            style={styles.apply}
          >
            Apply
          </a>

        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={styles.mobileMenu}>

          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/student-life" onClick={() => setMenuOpen(false)}>Student Life</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          {!user ? (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          ) : (
            <>
              <Link
                href={`/${user.role}/dashboard`}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </>
  );
}

/* ================= INLINE STYLES ================= */

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "#0b1f3a",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logo: {
    width: "40px",
    height: "40px",
  },

  brand: {
    fontWeight: "600",
  },

  center: {
    display: "flex",
    gap: "20px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  hamburger: {
    display: "none",
    fontSize: "26px",
    cursor: "pointer",
  },

  loginBtn: {
    background: "#f5c542",
    padding: "6px 12px",
    borderRadius: "6px",
    color: "#000",
    textDecoration: "none",
    fontWeight: "600",
  },

  apply: {
    background: "#f5c542",
    padding: "6px 12px",
    borderRadius: "6px",
    color: "#000",
    textDecoration: "none",
    fontWeight: "600",
  },

  userWrapper: {
    position: "relative",
  },

  userBtn: {
    background: "white",
    color: "#0b1f3a",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  dropdown: {
    position: "absolute",
    top: "40px",
    right: 0,
    background: "white",
    color: "#000",
    borderRadius: "6px",
    minWidth: "150px",
    padding: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  dropItem: {
    display: "block",
    marginBottom: "8px",
  },

  logoutBtn: {
    width: "100%",
    padding: "6px",
    border: "none",
    background: "#ff4d4d",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },

  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    background: "#0b1f3a",
    color: "white",
  },
};

/* ================= RESPONSIVE RULE ================= */

if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @media (max-width: 768px) {
      .center {
        display: none;
      }

      .right {
        display: none;
      }

      .hamburger {
        display: block !important;
      }
    }
  `;
  document.head.appendChild(style);
}