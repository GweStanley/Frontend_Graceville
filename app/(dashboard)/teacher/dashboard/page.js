"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    // optional role protection
    if (parsedUser.role !== "teacher") {
      router.replace("/login");
      return;
    }

    setUser(parsedUser);
  }, []);

  return (
    <div className="dash">
      <h1>Teacher Dashboard</h1>

      {user && (
        <p>
          Welcome, {user.name} ({user.matricule})
        </p>
      )}

      <div className="cards">

        {/* E-LEARNING */}
        <div
          className="card"
          onClick={() => router.push("/teacher/courses")}
        >
          📚 E-Learning
        </div>

        {/* DIGITAL LIBRARY */}
        <div
          className="card"
          onClick={() => router.push("/teacher/library")}
        >
          📖 Digital Library
        </div>

        {/* ASSIGNMENTS */}
        <div
          className="card"
          onClick={() => router.push("/teacher/assignments")}
        >
          📝 Assignments
        </div>

        {/* RESULTS / GRADING */}
        <div
          className="card"
          onClick={() => router.push("/teacher/results")}
        >
          📊 Results / Grading
        </div>

      </div>
    </div>
  );
}