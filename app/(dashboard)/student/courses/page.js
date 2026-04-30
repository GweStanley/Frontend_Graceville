"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CoursesPage() {
  const router = useRouter(); // ✅ MUST be here

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/courses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCourses(res.data);
    };

    fetchCourses();
  }, []);

  return (
    <div className="dash">
      <h1>My Courses</h1>

      <div className="cards">
        {courses.map((course) => (
          <div
            key={course._id}
            className="card"
            onClick={() =>
              router.push(`/student/courses/${course._id}`)
            }
          >
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}