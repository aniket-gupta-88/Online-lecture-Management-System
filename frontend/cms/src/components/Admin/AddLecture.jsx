import React, { useState, useEffect } from 'react';
import { getAllCourses, getAllInstructors, createLecture } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ADSidenav from './ADSidenav';


const AddLecture = () => {
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        fetchCourses();
        fetchInstructors();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await getAllCourses();
            setCourses(response.data.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchInstructors = async () => {
        try {
            const response = await getAllInstructors();
            setInstructors(response.data.data);
        } catch (error) {
            console.error('Error fetching instructors:', error);
        }
    };

    const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "iclvz14i"); 
    formData.append("cloud_name", "dg01ciwao"); 
      
    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dg01ciwao/upload", 
        {
            method: "POST",
            body: formData,
        }
    );
      
    const data = await res.json();
    return { public_id: data.public_id, url: data.secure_url };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const uploadImage = await imageUpload(thumbnail);
            const image_url = uploadImage.url;
            console.log(courseId, instructorId, date, description, image_url);
            const response = await createLecture({
                course_id:courseId,
                instructor_id:instructorId,
                date,
                description,
                image_url
            });
            if (response.status === 200) {
                console.log('Lecture created successfully:', response.data);
                toast('Lecture created successfully');
            }
        } catch (error) {
            console.error('Error creating lecture:', error);
            toast('Error creating lecture');
        }
        resetForm();
    };

    const resetForm = () => {
        setCourseId('');
        setInstructorId('');
        setDate('');
        setDescription('');
        setThumbnail(null);
    };

    return (
        <>
            <ADSidenav />
            <ToastContainer />
            <div className="fixed top-1/2 left-1/2 w-1/2 bg-red-200 transform -translate-x-1/2 -translate-y-1/2">
                <form onSubmit={handleSubmit} className="border rounded-md shadow-lg p-6 bg-white">
                    <div className="text-2xl font-semibold mb-4">Add Lecture</div>
                    <div className="mb-4">
                        <label htmlFor="course" className="block text-gray-800 font-semibold mb-2">Course:</label>
                        <select id="course" value={courseId} onChange={(e) => setCourseId(e.target.value)} className="w-full border rounded-md p-2" required>
                            <option value="">Select Course</option>
                            {courses.map(course => (
                                <option key={course._id} value={course._id}>{course.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="instructor" className="block text-gray-800 font-semibold mb-2">Instructor:</label>
                        <select id="instructor" value={instructorId} onChange={(e) => setInstructorId(e.target.value)} className="w-full border rounded-md p-2" required>
                            <option value="">Select Instructor</option>
                            {instructors.map(instructor => (
                                <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-800 font-semibold mb-2">Date:</label>
                        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded-md p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-800 font-semibold mb-2">Description:</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-md p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="thumbnail" className="block text-gray-800 font-semibold mb-2">Thumbnail:</label>
                        <input type="file" id="thumbnail" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} className="w-full border rounded-md p-2" required />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>
            </div>
        </>
    );
};

export default AddLecture;
