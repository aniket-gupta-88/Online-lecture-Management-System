import React, { useState, useEffect } from 'react';
import ADSidenav from './ADSidenav';
import { getAllLectures, getProfile, getCourseDetails } from '../../services/api';

const Lectures = () => {
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        fetchLectures();
    }, []);

    const fetchLectures = async () => {
        try {
            const response = await getAllLectures();
            const lecturesData = response.data.data;
            console.log("lecturesData: ",lecturesData);

            const lecturesWithDetails = await Promise.all(
                lecturesData.map(async lecture => {
                    const instructor = await getProfile(lecture.instructor_id);
                    const course = await getCourseDetails(lecture.course_id);
                    return {
                        ...lecture,
                        instructorName: instructor.data.username,
                        courseDetails: course.data.data,
                    };
                })
            );

            setLectures(lecturesWithDetails);
        } catch (error) {
            console.error('Error fetching lectures:', error);
        }
    };

    return (
        <>
            <ADSidenav />
            <div className="fixed top-16 left-1/4 flex flex-col overflow-y-auto h-full w-3/4 pr-10 pb-20">
                <div className="text-4xl font-semibold mb-4">Lectures</div>
                <div>
                    {lectures.map((lecture, index) => (
                        <div key={lecture._id} className="border rounded p-3 mb-2">
                            <div>Course: {lecture.courseDetails.name}</div>
                            <div className="font-semibold">Lecture: {index + 1} {lecture.name}</div>
                            <div>Desc: {lecture.description}</div>
                            <div>Date: {new Date(lecture.date).toLocaleDateString()}</div>
                            <div>Instructor: {lecture.instructorName}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Lectures;
