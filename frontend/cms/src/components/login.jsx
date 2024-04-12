import React, { useState, useEffect } from 'react';
import { login } from "../services/api.js";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header.jsx';

const Login = () => {
    const [username , setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState(null);
    const navigation = useNavigate();
    
    const handleChange = (e) => {
       const {name, value} = e.target;
       if(name === 'username') setUsername(value);
       else if(name === 'password') setPassword(value);
       else setRole(value);
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        if(!user){
            navigation("/register"); 
        }
     }, [navigation])
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await (login ({username, password, role}))
      console.log(result);
      setErrors(null);
      if(result.status === 200){
        if(result.data.status === 200){
            localStorage.setItem('user', JSON.stringify(result.data.data))
            if(result.data.data.userRole === 'admin')
                navigation("/adminDashboard");
            else if(result.data.data.userRole === 'instructor')
                navigation("/instructorDashboard")
            return;
        }
        if(result.data.status === 201){
            setErrors(result.data.data);
            toast(result.data.message);
            return;
        }
        if(result.data.status === 202){
            toast(result.data.message);
            return;
        }
      }
      else{
        toast('Something went wrong, please try again later...')
      }
    };

    return (
        <>
        <Header />
        <div className="container px-0">
            <ToastContainer />
            <div className="flex justify-center items-center min-h-screen bg-gray-400">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-center text-2xl mb-4">Welcome to Course Management System</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                            Role
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="role"
                            name="role"
                            value={role}
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="instructor">Instructor</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            <Link to = "/register">
                            Register
                            </Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default Login;
