"use client";

import { useState } from "react";
import axios from "axios";

export default function TeacherAssignments() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const createAssignment = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/assignments`,
      { title, description, dueDate }
    );

    alert("Assignment created");
  };

  return (
    <div className="dash">
      <h1>Create Assignment</h1>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={createAssignment}>
        Create
      </button>
    </div>
  );
}