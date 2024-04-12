import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ADSidenav from './Admin/ADSidenav';
import IDSidenav from './Instructor/IDSidenav';

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userLoggedIn = !!user;
        if (!userLoggedIn) {
            navigation("/");
        } else {
            setUserRole(user.userRole || '');
            setIsLoggedIn(userLoggedIn);
        }
    }, [navigation, isLoggedIn]); // Only navigation is needed as a dependency
    

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <nav className="fixed top-0 z-100 w-screen text-white border-gray-200 px-2 sm:px-4 py-2.5 bg-gray-900">
                <div className="flex mr-3 h-6 sm:h-9 flex-wrap md:justify-between justify-between mx-auto">
                    <span className="text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">
                        Course Management System
                    </span>
                </div>
            </nav>
        </>
    );
};

export default Header;
