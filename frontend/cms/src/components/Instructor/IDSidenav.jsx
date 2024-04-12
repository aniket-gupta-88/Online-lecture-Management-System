import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/api.js';
import Avatar from "../../assets/UserProfile.png";

const ADSidenav = () => {
    const navigation = useNavigate();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await getProfile();
            setUserDetails(response.data);
            console.log(userDetails);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            navigation('/');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigation('/register');
    };

    return (
      <div className="flex flex-col justify-start items-start pt-10 sm:w-1/5 w-1/6 h-screen border-solid border-r-4 border-black overflow-y-hidden">
            <div className="flex flex-col items-center ml-4 pt-4 border-solid border-b-2 border-black">
                <img
                    className="rounded-full w-20 h-20 mb-2"
                    src={Avatar} 
                    alt="User Profile"
                />
                <div className="text-center">
                    <p className="text-lg font-semibold">{userDetails?.username}</p>
                    <p className="text-sm">{userDetails?.email}</p>
                </div>
            </div>
            <br/>
            <div className="flex flex-col items-start mb-3">
                <p className="text-lg font-semibold mb-2 ml-2 border-solid border-3 px-3 border-black">Navigations</p>
                <ul className="space-y-3 px-4">
                    <li>
                        <button className="text-left text-base font-medium text-gray-600 hover:text-gray-800 focus:outline-none">
                            Lectures
                        </button>
                    </li>
                </ul>
            </div>
            <br />
            <div className='mt-auto mb-3 ml-4'>
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleLogout}
            >
                Logout
            </button>
            </div>
        </div>
    );
};

export default ADSidenav;
