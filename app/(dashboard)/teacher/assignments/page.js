"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherAssignments() {
  const [tab, setTab] = useState(null); // 👈 landing state = no section open

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);

  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const [grades, setGrades] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [activeEval, setActiveEval] = useState(null);

  const [now, setNow] = useState(Date.now());

  const token =
    typeof window !== "undefined" && localStorage.getItem("token");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL.replace("/api", "");

  // CLOCK
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // LOAD
  const fetchCourses = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/courses`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCourses(res.data);
  };

  const fetchAssignments = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/assignments`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAssignments(res.data);
  };

  const fetchSubs = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/assignments/submissions`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubmissions(res.data);
  };

  useEffect(() => {
    fetchCourses();
    fetchAssignments();
    fetchSubs();
  }, []);

  // CREATE
  const createAssignment = async () => {
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("course", course);
    form.append("dueDate", dueDate);
    if (file) form.append("file", file);

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/assignments`,
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTab(null);
    fetchAssignments();
  };

  // COUNTDOWN
  const countdown = (due) => {
    const diff = new Date(due).getTime() - now;
    if (diff <= 0) return "Closed";

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);

    return `${h}h ${m}m`;
  };

  // SAVE GRADE
  const saveGrade = async (id, maxScore) => {
    const g = Number(grades[id]);

    if (g < 0 || g > maxScore) {
      alert(`0 - ${maxScore}`);
      return;
    }

    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/assignments/grade/${id}`,
      {
        grade: g,
        feedback: feedbacks[id] || "",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setActiveEval(null);
    fetchSubs();
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>

        <h1 style={styles.title}>Teacher Assignments</h1>

        {/* ================= LANDING BUTTONS ================= */}
        {tab === null && (
          <div style={styles.menu}>
            <button style={styles.bigBtn} onClick={() => setTab("create")}>
              Create Assignment
            </button>

            <button style={styles.bigBtn} onClick={() => setTab("ongoing")}>
              Ongoing Assignments
            </button>

            <button style={styles.bigBtn} onClick={() => setTab("subs")}>
              Student Submissions
            </button>
          </div>
        )}

        {/* BACK BUTTON */}
        {tab && (
          <button style={styles.back} onClick={() => setTab(null)}>
            ← Back
          </button>
        )}

        {/* ================= CREATE ================= */}
        {tab === "create" && (
          <div style={styles.card}>
            <h2>Create Assignment</h2>

            <input placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input} />

            <textarea placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea} />

            <select onChange={(e) => setCourse(e.target.value)}
              style={styles.input}>
              <option>Select Course</option>
              {courses.map(c => (
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
            </select>

            <input type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={styles.input} />

            <input type="file"
              onChange={(e) => setFile(e.target.files[0])} />

            <button style={styles.primaryBtn} onClick={createAssignment}>
              Publish
            </button>
          </div>
        )}

        {/* ================= ONGOING ================= */}
        {tab === "ongoing" && (
          <div style={styles.card}>
            <h2>Ongoing Assignments</h2>

            {assignments.map(a => (
              <div key={a._id} style={styles.box}>
                <b>{a.title}</b>
                <p>{a.description}</p>
                <p style={styles.red}>⏳ {countdown(a.dueDate)}</p>

                {a.fileUrl && (
                  <a href={`${BASE_URL}${a.fileUrl}`} target="_blank">
                    Download File
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================= SUBMISSIONS ================= */}
        {tab === "subs" && (
          <div style={styles.card}>
            <h2>Submissions</h2>

            {submissions.map(s => {
              const graded = s.grade != null;

              return (
                <div key={s._id} style={styles.box}>
                  <b>{s.student?.name}</b>
                  <p>{s.assignment?.title}</p>

                  {s.answer && <p>{s.answer}</p>}

                  {s.fileUrl && (
                    <a href={`${BASE_URL}${s.fileUrl}`} target="_blank">
                      Download File
                    </a>
                  )}

                  <p style={graded ? styles.green : styles.orange}>
                    {graded ? "Evaluated" : "Pending"}
                  </p>

                  {!graded && activeEval !== s._id && (
                    <button onClick={() => setActiveEval(s._id)}>
                      Evaluate
                    </button>
                  )}

                  {activeEval === s._id && (
                    <div>
                      <input
                        type="number"
                        placeholder="Grade"
                        onChange={(e) =>
                          setGrades({
                            ...grades,
                            [s._id]: e.target.value,
                          })
                        }
                        style={styles.input}
                      />

                      <textarea
                        placeholder="Feedback"
                        onChange={(e) =>
                          setFeedbacks({
                            ...feedbacks,
                            [s._id]: e.target.value,
                          })
                        }
                        style={styles.textarea}
                      />

                      <button
                        style={styles.primaryBtn}
                        onClick={() =>
                          saveGrade(s._id, s.assignment?.maxScore || 100)
                        }
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

/* ================= CLEAN UI ================= */
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: 30,
  },

  container: {
    width: "100%",
    maxWidth: 900,
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginTop: 40,
  },

  bigBtn: {
    padding: "18px",
    fontSize: "16px",
    background: "#0b1f3a",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: 8,
  },

  back: {
    marginBottom: 10,
    background: "transparent",
    border: "none",
    color: "#0b1f3a",
    cursor: "pointer",
  },

  card: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 10,
  },

  box: {
    padding: 12,
    border: "1px solid #eee",
    marginBottom: 10,
    borderRadius: 6,
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },

  textarea: {
    width: "100%",
    minHeight: 80,
    marginBottom: 10,
    padding: 10,
  },

  primaryBtn: {
    background: "#0b1f3a",
    color: "#fff",
    padding: 10,
    border: "none",
    cursor: "pointer",
  },

  red: { color: "red" },
  green: { color: "green" },
  orange: { color: "orange" },
};