"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function LibraryPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL.replace("/api", "");

  // ================= FETCH LIBRARY =================
  const fetchLibrary = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/library`
      );

      setItems(res.data);
    } catch (err) {
      console.log("LIBRARY ERROR:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, []);

  // ================= FILTER =================
  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 School Library</h1>

      {/* SEARCH */}
      <input
        placeholder="Search materials..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* LOADING */}
      {loading && <p style={styles.loading}>Loading library...</p>}

      {/* GRID */}
      <div style={styles.grid}>
        {filtered.map((item) => (
          <div key={item._id} style={styles.card}>
            
            {/* TITLE */}
            <h3 style={styles.cardTitle}>{item.title}</h3>

            {/* UPLOADER */}
            {item.uploadedBy && (
              <p style={styles.meta}>
                Uploaded by: {item.uploadedBy.name}
              </p>
            )}

            {/* FILE BUTTON */}
            <a
              href={`${BASE_URL}${item.fileUrl}`}
              target="_blank"
              style={styles.button}
            >
              📄 Open / Download
            </a>

            {/* DATE */}
            <p style={styles.date}>
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <p style={styles.empty}>No materials found</p>
      )}
    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
  },

  search: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
  },

  loading: {
    textAlign: "center",
    color: "#777",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "0.2s ease",
  },

  cardTitle: {
    marginBottom: "8px",
  },

  meta: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "10px",
  },

  button: {
    display: "inline-block",
    padding: "10px 15px",
    background: "#0b1f3a",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
  },

  date: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#999",
  },

  empty: {
    textAlign: "center",
    marginTop: "20px",
    color: "#777",
  },
};