import React, { useEffect, useState } from 'react';
import ADSidenav from './ADSidenav';
import { getAllInstructors } from '../../services/api'; 
import Avatar from '../../assets/UserProfile.png';

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = async () => {
        try {
            const response = await getAllInstructors();
            setInstructors(response.data.data);
        } catch (error) {
            console.error('Error fetching instructors:', error);
        }
    };

    return (
        <>
            <ADSidenav />
            <div className="fixed top-16 left-1/4 flex flex-col ">
                <div className="text-4xl font-semibold mb-4">Instructors</div>
                <div>
                    {instructors.map(instructor => (
                        <div key={instructor._id} className=" border rounded p-3 mb-2 flex items-center border-3 shadow-md">
                            <img src={Avatar} alt="Instructor Avatar" className="w-12 h-12 mr-3" />
                            <div>
                                <div className="font-semibold">{instructor.name}</div>
                                <div>{instructor.email}</div>
                                <div>{instructor.specialization}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Instructors;