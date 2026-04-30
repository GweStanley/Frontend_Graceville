"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="dash">
      <h1>Teacher Dashboard</h1>

      {user && <p>Welcome, {user.name}</p>}

      <div className="cards">

        {/* E-LEARNING */}
        <div
          className="card"
          onClick={() => router.push("/teacher/courses")}
        >
          📚 E-Learning
        </div>

        {/* LIBRARY (placeholder for now) */}
        <div className="card">
          📖 Digital Library
        </div>

        {/* FUTURE MODULES */}
        <div className="card">📝 Assignments</div>
        <div className="card">📊 Results</div>

      </div>
    </div>
  );
}