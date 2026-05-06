"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Results() {
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/assignments/my-results`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setResults(res.data));
  }, []);

  return (
    <div className="dash">
      <h1>Results</h1>

      {/* EMPTY STATE */}
      {results.length === 0 ? (
        <p style={{ marginTop: "20px", opacity: 0.7 }}>
          No results yet
        </p>
      ) : (
        results.map((r) => (
          <div key={r._id} className="card">
            <h3>{r.assignment.title}</h3>
            <p>Grade: {r.grade ?? "Pending"}</p>
            <p>{r.feedback}</p>
          </div>
        ))
      )}
    </div>
  );
}