"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const syncUser = () => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  };

  useEffect(() => {
    syncUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setDropdown(false);
    setMenuOpen(false);

    router.push("/login");
  };

  return (
    <>
      <nav className="nav">

        {/* LEFT */}
        <div className="left">
          <img src="/logo.png" className="logo" />
          <span className="brand">Graceville</span>
        </div>

        {/* HAMBURGER */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* DESKTOP LINKS */}
        <div className="center">
          <Link href="/">Home</Link>
          <Link href="/student-life">Student Life</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* RIGHT */}
        <div className="right">

          {!user ? (
            <Link href="/login" className="loginBtn">
              Login
            </Link>
          ) : (
            <div className="userBox">
              <div
                className="userBtn"
                onClick={() => setDropdown(!dropdown)}
              >
                👤 {user.name?.split(" ")[0]}
              </div>

              {dropdown && (
                <div className="dropdown">
                  <Link
                    href={`/${user.role}/dashboard`}
                    onClick={() => setDropdown(false)}
                  >
                    Dashboard
                  </Link>

                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSePPooFxqdYLX7V31EkAcwLNEwACrGbZabX9pSL0z7k7XKg-Q/viewform"
            target="_blank"
            className="applyBtn"
          >
            Apply
          </a>

        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobileMenu">

          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
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

              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </>
  );
}