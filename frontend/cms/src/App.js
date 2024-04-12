import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Header from "./components/Header";
import Register from "./components/Register";
import Courses from "./components/Admin/Courses";
import Instructors from "./components/Admin/Instructors";
import Lectures from "./components/Admin/Lectures";
import AddCourse from "./components/Admin/AddCourse";
import AddLecture from "./components/Admin/AddLecture";
import ILectures from "./components/Instructor/ILectures";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminDashboard" element={<Courses />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/add-lecture" element={<AddLecture />} />
          <Route path="/instructorDashboard" element={<ILectures />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
