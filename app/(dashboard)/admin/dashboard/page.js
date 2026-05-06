"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState(null);

  const [name, setName] = useState("");
  const [matricule, setMatricule] = useState("");
  const [role, setRole] = useState("student");

  const [users, setUsers] = useState([]);

  const [showLibraryForm, setShowLibraryForm] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookFile, setBookFile] = useState(null);

  // ✅ FIXED ANNOUNCEMENTS STATE
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [announcements, setAnnouncements] = useState([]);

  const [token, setToken] = useState(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    setUser(storedUser);
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchAnnouncements();
    }
  }, [token]);

  // ================= USERS =================
  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsers();
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    deleteUser(id);
  };

  const createUser = async () => {
    await axios.post(
      `${API}/users`,
      { name, matricule, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setName("");
    setMatricule("");
    fetchUsers();
  };

  // ================= LIBRARY =================
  const addBook = async () => {
    const formData = new FormData();
    formData.append("title", bookTitle);
    if (bookFile) formData.append("file", bookFile);

    await axios.post(`${API}/library`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setBookTitle("");
    setBookFile(null);
  };

  // ================= ANNOUNCEMENTS =================
  const fetchAnnouncements = async () => {
    const res = await axios.get(`${API}/announcements`);
    setAnnouncements(res.data);
  };

  const publishAnnouncement = async () => {
    await axios.post(
      `${API}/announcements`,
      {
        title: announcementTitle,
        content: announcementContent,
        startDate,
        endDate,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setAnnouncementTitle("");
    setAnnouncementContent("");
    setStartDate("");
    setEndDate("");

    fetchAnnouncements();
  };

  const deleteAnnouncement = async (id) => {
    await axios.delete(`${API}/announcements/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchAnnouncements();
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      <div style={styles.btnGrid}>
        <button onClick={() => setActive("create")} style={styles.mainBtn}>
          ➕ Create User
        </button>

        <button onClick={() => setActive("users")} style={styles.mainBtn}>
          👥 Manage Users
        </button>

        <button onClick={() => setActive("library")} style={styles.mainBtn}>
          📚 Library
        </button>

        <button onClick={() => setActive("announcements")} style={styles.mainBtn}>
          📢 Announcements
        </button>
      </div>

      {/* USERS */}
      {active === "users" && (
        <div style={styles.panel}>
          {users.map((u) => (
            <div key={u._id} style={styles.userRow}>
              <span>{u.name} ({u.role})</span>

              <button onClick={() => handleDelete(u._id, u.name)} style={styles.deleteBtn}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

{/* LIBRARY */}
{active === "library" && (
  <div style={styles.panel}>
    <h3>📚 Library Management</h3>

    {/* ACTION BUTTONS */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      
      <a href="/library" style={styles.actionBtn}>
        📖 See Library
      </a>

      <button
        onClick={() => setShowLibraryForm(!showLibraryForm)}
        style={styles.actionBtn}
      >
        ➕ Add Material
      </button>
    </div>

    {/* ADD FORM */}
    {showLibraryForm && (
      <div>
        <input
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          placeholder="Material title"
          style={styles.input}
        />

        <input
          type="file"
          onChange={(e) => setBookFile(e.target.files[0])}
          style={styles.input}
        />

        <button onClick={addBook} style={styles.mainBtn}>
          Upload Material
        </button>
      </div>
    )}
  </div>
)}

      {/* ANNOUNCEMENTS */}
      {active === "announcements" && (
        <div style={styles.panel}>
          <h3>Create Announcement</h3>

          <input
            placeholder="Title"
            value={announcementTitle}
            onChange={(e) => setAnnouncementTitle(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Content"
            value={announcementContent}
            onChange={(e) => setAnnouncementContent(e.target.value)}
            style={styles.textarea}
          />

          <input type="datetime-local" onChange={(e) => setStartDate(e.target.value)} style={styles.input} />
          <input type="datetime-local" onChange={(e) => setEndDate(e.target.value)} style={styles.input} />

          <button onClick={publishAnnouncement} style={styles.actionBtn}>
            Publish
          </button>

          {/* LIST ANNOUNCEMENTS */}
          <h3 style={{ marginTop: "20px" }}>All Announcements</h3>

          {announcements.map((a) => (
            <div key={a._id} style={styles.userRow}>
              <span>{a.title}</span>

              <button
                onClick={() => deleteAnnouncement(a._id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "30px",
    textAlign: "center",
  },

  btnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginTop: "30px",
  },

  mainBtn: {
    padding: "20px",
    fontSize: "16px",
    background: "#0b1f3a",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  panel: {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "left",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    marginBottom: "10px",
  },

  actionBtn: {
    width: "100%",
    padding: "12px",
    background: "#f5c542",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },

  userRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  smallBtn: {
    marginRight: "5px",
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
  },

  link: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "bold",
  },
};