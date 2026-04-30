"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/assignments`
      );
      setAssignments(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="dash">
      <h1>Assignments</h1>

      {assignments.map((a) => (
        <div key={a._id} className="card">
          <h3>{a.title}</h3>
          <p>{a.description}</p>
          <small>
            Due: {new Date(a.dueDate).toDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}