"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [syllabusPdf, setSyllabusPdf] = useState(null);

  const token =
    typeof window !== "undefined" && localStorage.getItem("token");

  // FETCH COURSES
  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/courses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // CREATE COURSE
  const createCourse = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/courses`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setDescription("");
      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // ADD LESSON (UPDATED WITH PDF + ZOOM)
  const addLesson = async () => {
    if (!selectedCourse) return alert("Select a course first");

    try {
      const formData = new FormData();

      formData.append("title", lessonTitle);
      formData.append("content", lessonContent);
      formData.append("videoUrl", videoUrl);
      formData.append("zoomLink", zoomLink);
      formData.append("courseId", selectedCourse._id);

      if (syllabusPdf) {
        formData.append("syllabusPdf", syllabusPdf);
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/lesson`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLessonTitle("");
      setLessonContent("");
      setVideoUrl("");
      setZoomLink("");
      setSyllabusPdf(null);

      alert("Lesson added successfully");
    } catch (err) {
      console.log(err);
      alert("Error adding lesson");
    }
  };

  return (
    <div className="dash">
      <h1>Teacher Courses</h1>

      {/* CREATE COURSE */}
      <div className="cardForm">
        <h3>Create Course</h3>

        <input
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createCourse}>Create Course</button>
      </div>

      {/* COURSE LIST */}
      <h3 style={{ marginTop: "30px", textAlign: 'center' }}>My Courses </h3>
      <h5 style={{ textAlign: 'center' }}>Click on each to add Lessons</h5>

      <div className="cards">
        {courses.map((course) => (
          <div
            key={course._id}
            className={`card ${
              selectedCourse?._id === course._id ? "activeCard" : ""
            }`}
            onClick={() => setSelectedCourse(course)}
          >
            <h4>{course.title}</h4>
            <p>{course.description}</p>
          </div>
        ))}
      </div>

      {/* ADD LESSON */}
      {selectedCourse && (
        <div className="cardForm" style={{ marginTop: "30px" }}>
          <h3>Add Lesson → {selectedCourse.title}</h3>

          <input
            placeholder="Lesson Title"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
          />

          <textarea
            placeholder="Lesson Content"
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
          />

          <input
            placeholder="Video URL (YouTube embed link)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <input
            placeholder="Zoom Live Class Link"
            value={zoomLink}
            onChange={(e) => setZoomLink(e.target.value)}
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setSyllabusPdf(e.target.files[0])}
          />

          <button onClick={addLesson}>Add Lesson</button>
        </div>
      )}
    </div>
  );
}