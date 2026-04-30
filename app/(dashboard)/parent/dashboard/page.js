"use client";

import { useEffect, useState } from "react";

export default function ParentDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="dash">
      <h1>Parent Dashboard</h1>

      {user && (
        <p>Welcome, {user.name}</p>
      )}

      <div className="cards">
        <div className="card">Child Progress</div>
        <div className="card">Attendance</div>
        <div className="card">Results</div>
      </div>
    </div>
  );
}