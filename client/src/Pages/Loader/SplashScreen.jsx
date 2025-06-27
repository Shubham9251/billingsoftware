import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const SplashScreen = () => {
  const navigate = useNavigate();

  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds
      return decoded.exp && decoded.exp > currentTime;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const authenticated = isTokenValid();
      // remove token from localStorage if it's invalid
      if (!authenticated) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
      navigate(authenticated ? '/dashboard' : '/login');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className='d-flex flex-column align-items-center justify-content-around text-light' style={{height: '100vh', width: '100vw', backgroundColor: '#2c3335' }}>
      <h2>Loading...</h2>
      <p>Checking authentication status...</p>
    </div>
  );
};

export default SplashScreen;
