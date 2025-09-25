import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Context/UserContext';

const PermissionWrapper = ({ children, required }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [userRole, setUserRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.name) {
      navigate('/login');
      return;
    }

    const fetchPermissions = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/getadminwrapper`, {
          username: user.name,
        });

        if (res.status === 200) {
          setUserRole(res.data.role);
          setPermissions(res.data.permissions || []);
        }
      } catch (err) {
        console.error('Error fetching permissions:', err);
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [user, navigate]);

  if (loading) return null;

  const hasAccess = userRole === 'admin' || permissions.includes(required);

  if (location.pathname === '/dashboard') {
    return <Navigate to="/dashboard/Overviews" replace />;
  }

  return hasAccess ? children : <Navigate to="/home" replace />;
};

export default PermissionWrapper;
