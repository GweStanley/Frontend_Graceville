"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
export default function StudentDashboard() {
  const router = useRouter();

  // single source of truth (auth hook)
  const user = useAuth("student");

  if (!user) return null; // prevents flicker before auth loads

  return (
    <div className="dash">
      <h1>Student Dashboard</h1>

      <p>
        Welcome, {user.name} ({user.matricule})
      </p>

      <div className="cards">

        {/* E-LEARNING */}
        <div
          className="card"
          onClick={() => router.push("/student/courses")}
        >
          📚 E-Learning
        </div>

        {/* ASSIGNMENTS */}
        <div
          className="card"
          onClick={() => router.push("/student/assignments")}
        >
          📝 Assignments
        </div>

        {/* RESULTS */}
        <div
          className="card"
          onClick={() => router.push("/student/results")}
        >
          📊 Results
        </div>

                    {/* DIGITAL LIBRARY */}
{/* DIGITAL LIBRARY */}
<div
  className="card"
  onClick={() => router.push("/library")}
  style={{ cursor: "pointer" }}
>
  📖 Digital Library
</div>        {/* RESOURCES */}

      </div>
    </div>
  );
}