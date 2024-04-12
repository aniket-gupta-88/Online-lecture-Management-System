import React, { useEffect, useState } from 'react';
import { getAllCourses, deleteCourse } from '../../services/api.js';
import ADSidenav from './ADSidenav.jsx';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await getAllCourses();
            setCourses(response.data.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleAddLecture = (courseId) => {
       navigation("/add-lecture");
    };

    const handleDeleteCourse =async (courseId) => {
      try{
        const response = await deleteCourse(courseId);
        fetchCourses();
        console.log(response); 
      }catch (error) {
        console.error('Error fetching courses:', error);
    }

    };

    return (
        <>
        <ADSidenav />
        <div className="fixed top-16 left-1/4 flex flex-col overflow-y-auto h-full w-3/4 pr-10 pb-20">
            <div className="text-4xl font-semibold mb-4 underline">Courses</div>
            <div>
                {courses.map(course => (
                    <div key={course._id} className="border rounded p-3 mb-4 border-solid border-3 border-black">
                        <div className="grid grid-cols-2 gap-x-4">
                            <div>
                                <div className="font-bold text-xl">{course.name}</div>
                                <div>{course.description}</div>
                                <div>{course.level}</div>
                            </div>
                            <div className='h-1/3 w-auto'>
                                <img src={course.image_url} alt="Course Thumbnail" />
                            </div>
                        </div>
                        <br />
                        <div className="flex space-x-2 py-2 px-3 justify-between items-stretch">
                            <button className='rounded-md bg-green-500 py-1 px-2' onClick={() => handleAddLecture(course._id)}>Add Lecture</button>
                            <button className='rounded-md bg-blue-500  py-1 px-2' onClick={() => handleDeleteCourse(course._id)}>Delete Course</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Courses;