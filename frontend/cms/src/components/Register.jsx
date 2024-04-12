import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from "../services/api.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header.jsx';

const Register = () => {
    const [form, setForm]= useState({
        name: "",
        email: "",
        username: "",
        password: "",
        role: ""
    });
    const [errors, setErrors] = useState(null);
    const navigation = useNavigate();
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(form);
        console.log("onSubmit:- ",result);
        if(result.status === 200){
            if(result.data.status === 200){
                localStorage.setItem('user', JSON.stringify(result.data.data));
                navigation("/");
                return;
            }
            if(result.data.status === 201){
                setErrors(result.data.data)
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
        <div className="container mt-3">
            <ToastContainer />
            <div className="flex justify-center items-center min-h-screen bg-gray-400">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded mt-5 px-8 pt-4 pb-8 mb-4">
                    <h2 className="text-center text-2xl mb-4">Register User</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
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
                            value={form.username}
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
                            value={form.password}
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
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="instructor">Instructor</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/" className="text-blue-500 hover:underline">Already registered? Login here</Link>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </>
    );
};

export default Register;
