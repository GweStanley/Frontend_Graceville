"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CourseLessons({ params }) {
  const [lessons, setLessons] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${params.id}/lessons`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLessons(res.data);
    };

    fetchLessons();
  }, [params.id]);

  return (
    <div className="lessonPage">
      {/* LEFT: LESSON LIST */}
      <div className="lessonList">
        <h3>Lessons</h3>

        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="lessonItem"
            onClick={() => setSelected(lesson)}
          >
            {lesson.title}
          </div>
        ))}
      </div>

      {/* RIGHT: CONTENT */}
      <div className="lessonContent">
        {selected ? (
          <>
            <h2>{selected.title}</h2>

            {selected.videoUrl && (
              <iframe
                width="100%"
                height="300"
                src={selected.videoUrl}
                title="lesson video"
              />
            )}

            <p>{selected.content}</p>
          </>
        ) : (
          <p>Select a lesson to begin</p>
        )}
      </div>
    </div>
  );
}