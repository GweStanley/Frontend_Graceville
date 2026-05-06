"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";

export default function CourseLessons({ params }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id;

  const [lessons, setLessons] = useState([]);
  const [selected, setSelected] = useState(null);

  const token =
    typeof window !== "undefined" && localStorage.getItem("token");

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL.replace("/api", "");

  // ================= FETCH LESSONS =================
  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLessons(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!courseId) return;
    fetchLessons();
  }, [courseId]);

  // ================= FIX YOUTUBE =================
  const getYoutubeEmbed = (url) => {
    if (!url) return null;

    const match = url.match(/v=([^&]+)/);
    const videoId = match ? match[1] : null;

    return videoId
      ? `https://www.youtube.com/embed/${videoId}`
      : null;
  };

  return (
    <div style={styles.page}>
      {/* LEFT LIST */}
      <div style={styles.list}>
        <h3>Lessons</h3>

        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            style={styles.item}
            onClick={() => setSelected(lesson)}
          >
            {lesson.title}
          </div>
        ))}
      </div>

      {/* RIGHT CONTENT */}
      <div style={styles.content}>
        {selected ? (
          <>
            <h2>{selected.title}</h2>

            {/* CONTENT */}
            <p style={styles.text}>{selected.content}</p>

            {/* YOUTUBE */}
            {selected.videoUrl && (
              <iframe
                width="100%"
                height="320"
                src={getYoutubeEmbed(selected.videoUrl)}
                title="lesson video"
                allowFullScreen
              />
            )}

            {/* ZOOM LINK */}
            {selected.zoomLink && (
              <a
                href={selected.zoomLink}
                target="_blank"
                style={styles.zoom}
              >
                🎥 Join Live Class (Zoom)
              </a>
            )}

            {/* SYLLABUS PDF */}
            {selected.syllabusPdf && (
              <a
                href={
                  selected.syllabusPdf.startsWith("http")
                    ? selected.syllabusPdf
                    : `${BASE_URL}${selected.syllabusPdf.startsWith("/") ? "" : "/"}${selected.syllabusPdf}`
                }
                target="_blank"
                rel="noreferrer"
                style={styles.pdf}
              >
                📄 Download Syllabus PDF
              </a>
            )}         
             </>
        ) :
         (
          <p>Select a lesson</p>
        )}
      </div>
    </div>
  );
}
const styles = {
  page: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    minHeight: "80vh",
  },

  list: {
    width: "30%",
    borderRight: "1px solid #ddd",
    paddingRight: "10px",
  },

  item: {
    padding: "12px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    transition: "0.2s",
  },

  content: {
    width: "70%",
    padding: "10px",
  },

  text: {
    marginBottom: "15px",
    color: "#444",
    lineHeight: "1.5",
  },

  zoom: {
    display: "block",
    marginTop: "30px",
    padding: "20px",
    background: "#0b1f3a",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    width: "fit-content",
  },

  pdf: {
    display: "block",
    marginTop: "20px",
    color: "#0b1f3a",
    fontWeight: "bold",
  },
};