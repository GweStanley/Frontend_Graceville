"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [matricule, setMatricule] = useState("");
  const [role, setRole] = useState("student");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const createUser = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      { name, matricule, role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("User created");
    setName("");
    setMatricule("");
  };

  return (
    <div className="dash">
      <h1>Admin Dashboard</h1>

      {user && <p>Welcome {user.name}</p>}

      <div className="cardForm">
        <h3>Create User</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Matricule"
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={createUser}>Create</button>
      </div>
    </div>
  );
}