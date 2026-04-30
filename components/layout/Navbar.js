"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  // ✅ SINGLE LOGOUT FUNCTION (FIXED)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setOpen(false);

    router.push("/login");
  };

  // ✅ AUTH SYNC
  const syncUser = () => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  };

  useEffect(() => {
    syncUser();

    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  return (
    <nav className="nav">

      {/* LEFT */}
      <div className="left">
        <img src="/logo.png" alt="Graceville Logo" className="logo" />
        <span className="brand">Graceville International</span>
      </div>

      {/* CENTER */}
      <div className="center">
        <Link href="/">Home</Link>
        <Link href="/#about">About</Link>
        <Link href="/student-life">Student Life</Link>
        <Link href="/contact">Contact</Link>
      </div>

      {/* RIGHT */}
      <div className="right">

        {/* AUTH STATE */}
        {!user ? (
          <Link href="/login" className="loginBtn">
            Login
          </Link>
        ) : (
          <div className="userWrapper">

            <div
              className="userBtn"
              onClick={() => setOpen(!open)}
            >
              👤 {user.name?.split(" ")[0]}
            </div>

            {open && (
              <div className="dropdown">

                <Link
                  href={`/${user.role}/dashboard`}
                  className="dropdownItem"
                  onClick={() => setOpen(false)}
                >
                  Your Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="dropdownBtn"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        )}

        {/* APPLY */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSePPooFxqdYLX7V31EkAcwLNEwACrGbZabX9pSL0z7k7XKg-Q/viewform?usp=publish-editor"
          target="_blank"
          rel="noreferrer"
          className="apply"
        >
          Admissions
        </a>

      </div>
    </nav>
  );
}