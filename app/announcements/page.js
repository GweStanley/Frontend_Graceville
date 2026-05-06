"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [now, setNow] = useState(Date.now());

  // auto refresh time (for countdown)
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ================= FETCH =================
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/announcements`
      );

      setAnnouncements(res.data);
    } catch (err) {
      console.log("ANNOUNCEMENT ERROR:", err.message);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ================= FILTER ACTIVE =================
  const activeAnnouncements = announcements.filter((a) => {
    if (!a.endDate) return true;

    const end = new Date(a.endDate).getTime();
    return now < end;
  });

  // ================= COUNTDOWN =================
  const getCountdown = (endDate) => {
    if (!endDate) return "";

    const diff = new Date(endDate).getTime() - now;

    if (diff <= 0) return "Expired";

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);

    return `${h}h ${m}m left`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📢 Announcements</h1>

      {activeAnnouncements.length === 0 && (
        <p style={styles.empty}>No active announcements</p>
      )}

      {activeAnnouncements.map((a) => (
        <div key={a._id} style={styles.card}>
          <h2>{a.title}</h2>

          <p style={styles.content}>{a.content}</p>

          {a.endDate && (
            <p style={styles.timer}>
              ⏳ {getCountdown(a.endDate)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
  },

  empty: {
    textAlign: "center",
    color: "#777",
  },

  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  content: {
    marginTop: "10px",
    lineHeight: "1.6",
  },

  timer: {
    marginTop: "10px",
    color: "#d9534f",
    fontWeight: "bold",
  },
};