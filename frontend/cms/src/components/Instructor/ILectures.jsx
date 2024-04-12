import React, { useState, useEffect } from 'react';
import IDSidenav from './IDSidenav';
import { getAllLectures } from '../../services/api'; // Import the API function to fetch lectures

const ILectures = () => {
    const [lectures, setLectures] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user')).userId; // Get userId from localStorage

    useEffect(() => {
        fetchLectures();
    }, []);

    const fetchLectures = async () => {
        try {
            const response = await getAllLectures();
            const allLectures = response.data.data;
            console.log(allLectures);
            const instructorLectures = allLectures.filter(lecture => lecture.instructor_id === userId);
            console.log(instructorLectures);
            setLectures(instructorLectures);
        } catch (error) {
            console.error('Error fetching lectures:', error);
        }
    };

    return (
        <>
            <IDSidenav />
            <div className="fixed top-16 left-1/4 flex flex-col overflow-y-auto h-full w-3/4 pr-10 pb-20">
                <h2 className="text-4xl font-bold mb-4">Your Assigned Lectures</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lectures.map(lecture => (
                        <div key={lecture._id} className="border rounded p-4">
                            <h3 className="text-xl font-semibold mb-2">{lecture.title}</h3>
                            <p className="text-gray-700">{lecture.description}</p>
                            <div>Date: {new Date(lecture.date).toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ILectures;
