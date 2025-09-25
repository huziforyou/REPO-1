import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import AuthProtectedWrapper from './Context/AuthProtectedWrapper'
import AlreadyLogin from './Context/AlreadyLogin'
import Dashboard from './pages/Dashboard'
import Overview from './pages/Overview'
import Images from './pages/Images'
import UserRequest from './pages/UserRequest'
import Settings from './pages/Settings'
import ApprovedUsers from './pages/ApprovedUsers'
import DeniedUsers from './pages/DeniedUsers'
import PendingUsers from './pages/PendingUsers'
import AdminProtectedWrapper from './Context/AdminProtectedWrapper'
import PermissionsUsers from './pages/PermissionsUsers'
import PermissionWrapper from './Context/PermissionsWrapper'
import { UserProvider } from './Context/UserContext'
import Gallery from './pages/Gallery'


const App = () => {

  const [darkMode, setDarkMode] = useState(() => {
    // read from localStorage on first load
    const storedMode = localStorage.getItem('darkMode');
    return storedMode === 'true'; // convert string to boolean
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Save the preference
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  return (
    <div>
      <UserProvider>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Toaster />
        <Routes>
          <Route path="/" element={
            <AlreadyLogin>
              <Register />
            </AlreadyLogin>
          } />
          <Route path="/login" element={
            <AlreadyLogin>
              <Login />
            </AlreadyLogin>
          } />

          <Route path='/Gallery' element={<Gallery />} />
          <Route path="/home" element={
            <AuthProtectedWrapper>
              <Home />
            </AuthProtectedWrapper>
          } />


          <Route
            path="/dashboard"
            element={
              <PermissionWrapper required='Dashboard'>
                <Dashboard />
              </PermissionWrapper>
            }
          >
            {/* Top-level dashboard routes */}
            <Route
              path="Overviews"
              element={
                <PermissionWrapper required='Overviews'>
                  <Overview />
                </PermissionWrapper>
              }
            />
            <Route
              path="Images"
              element={
                <PermissionWrapper required='Images'>
                  <Images />
                </PermissionWrapper>
              }
            />

            {/* Requests main page */}
            <Route
              path="Requests"
              element={
                <PermissionWrapper required='Requests'>
                  <UserRequest />
                </PermissionWrapper>
              }
            >
              {/* Nested inside Requests */}
              <Route
                path="Denied-Users"
                element={
                  <PermissionWrapper required='Denied-Users'>
                    <DeniedUsers />
                  </PermissionWrapper>
                }
              />
              <Route
                path="Pending-Users"
                element={
                  <PermissionWrapper required='Pending-Users'>
                    <PendingUsers />
                  </PermissionWrapper>
                }
              />
              <Route
                path="Permissions-Users"
                element={
                  <PermissionWrapper required='Permissions-Users'>
                    <PermissionsUsers />
                  </PermissionWrapper>
                }
              />
              <Route
                path="Approved-Users"
                element={
                  <PermissionWrapper required='Approved-Users'>
                    <ApprovedUsers />
                  </PermissionWrapper>
                }
              />
            </Route>

            <Route
              path="Settings"
              element={
                <PermissionWrapper>
                  <Settings />
                </PermissionWrapper>
              }
            />
          </Route>

        </Routes>
      </UserProvider>

    </div>
  )
}

export default App
