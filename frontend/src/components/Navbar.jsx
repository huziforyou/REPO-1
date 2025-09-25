import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoMdArrowDropdown, IoMdImages } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdOutlineDashboard } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';
import { useUser } from '../Context/UserContext'; // ✅ Import useUser

const Navbar = ({ darkMode, setDarkMode }) => {

    const location = useLocation();
    const [LoginPage, setLoginPage] = useState(false)
    const token = localStorage.getItem('token');



    const [showmenu, setShowmenu] = useState(false)
    const navigate = useNavigate();
    const [admin, setAdmin] = useState('')
    const { logout, user, loading } = useUser();




    useEffect(() => {
        setLoginPage(location.pathname === '/login');
    }, [location.pathname]);


    const handleLogout = async () => {
        try {

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {}, {});
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
                logout()
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    useEffect(() => {
        if (user?.name) {
            const checkAdmin = async () => {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/getadmin`, {
                        username: user.name,
                    });

                    if (response.status === 200) {
                        setAdmin(response.data);
                    }
                } catch (err) {
                    console.error(err.message);
                }
            };

            checkAdmin();
        }
    }, [user]);





    return (
        <div className="w-full h-16 flex bg-white border-b-2 border-gray-200 dark:bg-zinc-900 items-center justify-between px-3 sm:px-4 shadow-lg">

            <div>
                {token && (
                    <div className="relative">
                        <h1
                            onClick={() => setShowmenu(!showmenu)}
                            className="font-inter text-xs sm:text-sm md:text-base lg:text-lg flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            Welcome, {user?.name}
                            <IoMdArrowDropdown className="ml-1" />
                        </h1>

                        {showmenu && (
                            <div className="absolute rounded-md left-0 shadow-lg bg-gray-100 dark:bg-zinc-800 w-40 sm:w-48 px-3 py-2 flex flex-col gap-4 text-gray-700 dark:text-gray-200 font-inter z-50 text-sm">
                                <div className="flex items-center justify-end">
                                    <IoClose
                                        onClick={() => setShowmenu(false)}
                                        className="cursor-pointer hover:text-gray-600"
                                        size={20}
                                    />
                                </div>
                                <Link onClick={() => { setShowmenu(!showmenu) }} to="/home" className="hover:text-gray-600 border-b border-gray-400 hover:border-gray-600">Home</Link>
                                {(user?.role === 'admin' || user?.permissions?.includes('Dashboard')) && (
                                    <Link
                                        onClick={() => setShowmenu(!showmenu)}
                                        to="/dashboard/Overviews"
                                        className="hover:text-gray-600 border-b border-gray-400 hover:border-gray-600"
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                {(user?.role === 'admin' || user?.permissions?.includes('Overviews')) && (
                                    <Link
                                        onClick={() => setShowmenu(!showmenu)}
                                        to="/dashboard/Overviews"
                                        className="hover:text-gray-600 border-b flex items-center gap-3 lg:hidden border-gray-400 hover:border-gray-600"
                                    >
                                        Overview
                                    </Link>
                                )}

                                {(user?.role === 'admin' || user?.permissions?.includes('Images')) && (
                                    <Link
                                        onClick={() => setShowmenu(!showmenu)}
                                        to="/dashboard/Images"
                                        className="hover:text-gray-600 border-b flex items-center gap-3 lg:hidden border-gray-400 hover:border-gray-600"
                                    >
                                        Images
                                    </Link>
                                )}

                                {(user?.role === 'admin' || user?.permissions?.includes('Requests')) && (
                                    <Link
                                        onClick={() => setShowmenu(!showmenu)}
                                        to="/dashboard/Requests/Pending-Users"
                                        className="hover:text-gray-600 border-b flex items-center gap-3 lg:hidden border-gray-400 hover:border-gray-600"
                                    >
                                        User Requests
                                    </Link>
                                )}

                                <h1 className="hover:text-gray-600 border-b border-gray-400 hover:border-gray-600">Settings</h1>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 sm:w-14 h-7 sm:h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${darkMode ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                >
                    <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'
                            }`}
                    ></div>
                </button>

                {!token ? (
                    LoginPage ? (
                        <Link
                            to="/"
                            className="bg-blue-500 py-2 sm:py-3 px-3 sm:px-4 font-inter text-white text-xs sm:text-sm md:text-base rounded uppercase cursor-pointer hover:bg-blue-600 transition-all"
                        >
                            Register
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-500 py-2 sm:py-3 px-3 sm:px-4 font-inter text-white text-xs sm:text-sm md:text-base rounded uppercase cursor-pointer hover:bg-blue-600 transition-all"
                        >
                            Login
                        </Link>
                    )
                ) : (
                    <button
                        onClick={() => { setShowmenu(false); handleLogout(); }}
                        className="bg-blue-500 rounded-md flex items-center gap-1 sm:gap-2 py-2 px-3 sm:px-4 text-white text-xs sm:text-sm md:text-base uppercase font-inter hover:bg-blue-600 transition-all"
                    >
                        Logout <IoIosLogOut size={18} />
                    </button>
                )}
            </div>
        </div>



    )
}

export default Navbar
