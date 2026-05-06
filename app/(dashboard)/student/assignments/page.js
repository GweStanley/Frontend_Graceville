"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);

  const [answers, setAnswers] = useState({});
  const [files, setFiles] = useState({});

  // ✅ NEW: time state
  const [now, setNow] = useState(Date.now());

  const token =
    typeof window !== "undefined" && localStorage.getItem("token");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL.replace("/api", "");

  // ================= TIME =================
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ================= FETCH =================
  const fetchAssignments = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/assignments`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setAssignments(res.data);
  };

  // ================= SUBMIT =================
  const submit = async (id) => {
    try {
      const formData = new FormData();

      formData.append("assignmentId", id);
      formData.append("answer", answers[id] || "");

      if (files[id]) formData.append("file", files[id]);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/assignments/submit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Submitted");

      setAnswers((prev) => ({ ...prev, [id]: "" }));
      setFiles((prev) => ({ ...prev, [id]: null }));

    } catch (err) {
      alert("Submission failed");
    }
  };

  // ================= COUNTDOWN =================
  const getCountdown = (due) => {
    const dueTime = new Date(due).getTime();
    const diff = dueTime - now;

    if (diff <= 0) return "Closed";

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);

    return `${h}h ${m}m left`;
  };

  // ================= FILTER (48hr wipe) =================
  const visibleAssignments = assignments.filter((a) => {
    if (!a.dueDate) return true;

    const due = new Date(a.dueDate).getTime();
    const expire = due + 48 * 60 * 60 * 1000;

    return now < expire;
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Assignments</h1>

      {visibleAssignments.map((a) => {
        const dueTime = a.dueDate
          ? new Date(a.dueDate).getTime()
          : null;

        const isClosed = dueTime && now > dueTime;

        return (
          <div key={a._id} style={styles.card}>
            <h2>{a.title}</h2>
            <p>{a.description}</p>

            {/* ✅ DUE DATE + COUNTDOWN */}
            {a.dueDate && (
              <p style={styles.countdown}>
                ⏳ {getCountdown(a.dueDate)}
              </p>
            )}

            {/* FILE DOWNLOAD */}
            {a.fileUrl && (
              <a
                href={`${BASE_URL}${a.fileUrl}`}
                target="_blank"
                style={styles.download}
              >
                📄 Download Assignment File
              </a>
            )}

            {/* LOCK AFTER DEADLINE */}
            {!isClosed ? (
              <>
                <textarea
                  placeholder="Write your answer..."
                  value={answers[a._id] || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [a._id]: e.target.value,
                    })
                  }
                  style={styles.textarea}
                />

                <input
                  type="file"
                  onChange={(e) =>
                    setFiles({
                      ...files,
                      [a._id]: e.target.files[0],
                    })
                  }
                />

                <button
                  onClick={() => submit(a._id)}
                  style={styles.button}
                >
                  Submit
                </button>
              </>
            ) : (
              <p style={styles.closed}>Submission Closed</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
  },

  card: {
    border: "1px solid #ddd",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    background: "#fff",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
  },

  button: {
    padding: "10px 20px",
    background: "#0b1f3a",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  download: {
    display: "inline-block",
    margin: "10px 0",
    color: "#0b1f3a",
    fontWeight: "bold",
  },

  countdown: {
    color: "#d9534f",
    fontWeight: "bold",
  },

  closed: {
    color: "gray",
    fontWeight: "bold",
    marginTop: "10px",
  },
};