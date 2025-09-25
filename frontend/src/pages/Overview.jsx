import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const Overview = () => {
  const data = [
    { month: 'Jan', count: 4249 },
    { month: 'Feb', count: 2009 },
    { month: 'Mar', count: 1120 },
    { month: 'Apr', count: 2200 },
    { month: 'May', count: 2000 },
    { month: 'Jun', count: 1270 },
    { month: 'Jul', count: 2440 },
    { month: 'Aug', count: 1580 },
    { month: 'Sep', count: 2610 },
    { month: 'Oct', count: 1390 },
    { month: 'Nov', count: 1560 },
    { month: 'Dec', count: 2220 },
  ];
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    try {

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/`, {}, {});

      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch (err) {

    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className='p-4 flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-6'>
      <div className='w-full   gap-5'>
        <div className='w-full flex items-center justify-between  py-5   px-4 rounded-lg dark:bg-zinc-800 bg-gray-200 '>
          <h1 className='text-2xl font-roboto uppercase'>Total Users ( {users.length} )</h1>
          <Link className='cursor-pointer dark:hover:text-gray-300 hover:text-gray-600  hover:underline' to={'/dashboard/Requests/Permissions-Users'}>View Users</Link >
        </div>
      </div>

      <div className="w-full ">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 rounded-xl shadow-md bg-gray-200 dark:bg-zinc-800 transition-colors duration-300">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Images Fetched Per Month
          </h2>
          <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="month" stroke="currentColor" />
                <YAxis allowDecimals={false} stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    color: '#fff',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
