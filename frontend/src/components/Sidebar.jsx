// components/Sidebar.jsx
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
const Sidebar = () => {
    return (
        <div className="w-64 h-[100%] dark:bg-zinc-800 bg-gray-100 text-gray-700 dark:text-gray-200 p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <nav className="flex flex-col gap-6">
                <Link className='flex items-center gap-2 text-lg font-roboto hover:text-gray-400 text-grey-400' to="/dashboard/Overviews"><MdOutlineDashboard size={22} />Overview</Link>
                <Link className='flex items-center gap-2 text-lg font-roboto hover:text-gray-400 text-grey-400' to="/dashboard/Images"><IoMdImages size={22} />Images</Link>
                <Link className='flex items-center gap-2 text-lg font-roboto hover:text-gray-400 text-grey-400' to="/dashboard/Requests/Pending-Users"><FaUserPlus size={22} />Users Managment</Link>
                <Link className='flex items-center gap-2 text-lg font-roboto hover:text-gray-400 text-grey-400' to="/dashboard/settings"><CiSettings size={22} />Settings</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
