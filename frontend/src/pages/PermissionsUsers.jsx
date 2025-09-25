import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaUser } from "react-icons/fa";
import { IoClose } from 'react-icons/io5';

const PermissionsUsers = () => {
  const [users, setUsers] = useState([])
  const [giveaccess, setGiveaccess] = useState(false)
  const [isdelete, setIsdelete] = useState(false)
  const [username, setusername] = useState('')
  const [id, setid] = useState('')
  const [pages, setPages] = useState([])
  const getUsers = async () => {
    try {

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/`, {}, {});

      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch (err) {

    }
  }

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/users/delete/${id}/`, {}, {});
      if (response.status === 200) {
        toast.success(response.data.message)
        getUsers();
        setIsdelete(false)
      }
    } catch (err) {
      console.error(err.message)(err)
    }
  }

  const giveAccess = async (username, pages) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/give-access/${username}`, // userId in URL
        { pages } // pages from state
      );

      if (response.status == 200) {
        toast.success(response.data.message)
        setGiveaccess(false)
      }
    } catch (err) {
      console.error('Error giving access:', err);
    }
  };

  const getUserPermissions = async (username) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/permissions/${username}`, {}, {});

      if (response.status === 200) {
        setPages(response.data.permissions)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='lg:p-4 py-4  grid place-items-center  lg:grid-cols-6 grid-cols-2 gap-2 relative'>
      {
        users.map((user, idx) => {
          return (
            <div key={idx + 'users'} className='px-2 py-3 dark:bg-zinc-800 bg-gray-100 flex flex-col items-center justify-center gap-2 rounded-md shadow-md'>
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='p-4 rounded-full flex items-center justify-center dark:bg-gray-100/20 bg-zinc-800/20 lg:h-20 lg:w-20 h-20 w-20 text-3xl dark:text-black text-white'><FaUser /></div>
                <h1 className='text-roboto uppercase ' >{user.name}</h1>
              </div>
              <button onClick={() => { setGiveaccess(true); setid(user._id); getUserPermissions(user.name); setusername(user.name) }} className='w-full p-2 text-roboto uppercase text-xs lg:text-sm cursor-pointer hover:bg-blue-500/30 dark:hover:bg-green-500/10 bg-green-500/20 text-green-500 '>Give Access</button>
              <button onClick={() => { setIsdelete(true); setusername(user.name); setid(user._id) }} className='w-full p-2 text-roboto uppercase text-xs lg:text-sm cursor-pointer hover:bg-red-500/30 dark:hover:bg-red-500/10 bg-red-500/20 text-red-500 '>Permenent Delete</button>
            </div>
          )
        })
      }

      {
        giveaccess && (
          <div className='fixed flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-black/20 z-50'>
            <div className='bg-white flex flex-col gap-4 justify-between dark:bg-zinc-800 rounded-md h-auto w-80 p-4'>

              {/* Close Icon */}
              <div className='text-black dark:text-white text-xl flex items-center justify-end'>
                <IoClose className='cursor-pointer' onClick={() => setGiveaccess(false)} />
              </div>

              {/* Content */}
              <div className='w-full flex flex-col items-center justify-between h-full gap-4'>
                <h3 className='text-roboto uppercase text-sm text-center'>
                  Do you want to <span className='font-semibold'>give page access</span> to <span className='font-bold'>{username}</span>?
                </h3>

                <div className='flex flex-wrap gap-2'>
                  {
                    pages.map((page, idx) => {
                      return (
                        <h6 key={idx + page} className='p-2 flex items-center gap-2 uppercase text-xs lg:text-sm rounded bg-black/30'>{page} <IoClose onClick={() => setPages(pages.filter((_, i) => i !== idx))} /></h6>
                      )
                    })
                  }
                </div>

                {/* Optional: Page Select Dropdown */}
                <select
                  onChange={(e) => {
                    const newValue = e.target.value.trim();
                    if (pages.includes(newValue)) {
                      return;
                    }
                    setPages(prev => [...prev, newValue]);
                  }}
                  className='w-full p-2 rounded border border-gray-300 dark:border-zinc-600 text-black dark:text-white bg-transparent'
                >
                  <option value="" disabled>Select a Page</option>
                  <option value="Dashboard">Dashboard</option>
                  <option value="Images">Images</option>
                  <option value="Overviews">Overviews</option>
                  <option value="Requests">User Managment</option>
                  <option value="Approved-Users">Approved-Users</option>
                  {/* Add more pages as needed */}
                </select>

                {/* Buttons */}
                <div className='flex flex-col w-full gap-3'>
                  <button
                    onClick={() => giveAccess(username, pages)}
                    className='p-2 w-full bg-green-500/20 text-green-500'
                  >
                    Give Access
                  </button>
                  <button
                    onClick={() => { setGiveaccess(false); setusername(''); }}
                    className='p-2 w-full bg-red-500/20 text-red-500'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

        )
      }

      {
        isdelete && (
          <div className='fixed flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-black/20'>
            <div className='bg-white flex flex-col gap-4 justify-between dark:bg-zinc-800 rounded-md h-52 w-80 p-2'>
              <div className='text-black dark:text-white text-xl flex items-center justify-end'>
                <IoClose className='cursor-pointer' onClick={() => { setIsdelete(false) }} />
              </div>
              <div className='w-full  flex flex-col items-center  justify-between h-full '>
                <h3 className='text-roboto uppercase  text-xs'>Do You Want to Delete <span className='font-semibold'>{username}</span> User?</h3>
                <div className='flex flex-col w-full gap-3'>
                  <button onClick={() => { deleteUser() }} className='p-2 w-full bg-green-500/20 text-green-500'>Yes</button>
                  <button onClick={() => { setIsdelete(false); setusername('') }} className='p-2 w-full bg-red-500/20 text-red-500'>Cancel</button>

                </div>
              </div>

            </div>
          </div>
        )

      }
    </div>
  )
}

export default PermissionsUsers
