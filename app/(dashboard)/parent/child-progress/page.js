"use client";

export default function ChildProgressPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Child Progress</h1>

      <p>
        This page will display academic progress, attendance, and performance reports.
      </p>

      <div style={{
        marginTop: "20px",
        padding: "15px",
        background: "#f5f5f5",
        borderRadius: "8px"
      }}>
        <h3>Coming Features</h3>
        <ul>
          <li>Grades tracking</li>
          <li>Attendance records</li>
          <li>Teacher remarks</li>
          <li>Performance analytics</li>
        </ul>
      </div>
    </div>
  );
}