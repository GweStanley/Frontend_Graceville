"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [matricule, setMatricule] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          name,
          matricule,
        }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ROLE-BASED REDIRECT
      if (user.role === "admin") router.push("/admin/dashboard");
      else if (user.role === "teacher") router.push("/teacher/dashboard");
      else if (user.role === "parent") router.push("/parent/dashboard");
      else router.push("/student/dashboard");

    } catch (err) {
      setError("Invalid name or matricule. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginBox">
        <h2>Graceville Login</h2>
        <p className="subtext">Enter your name and matricule to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Matricule Number"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}