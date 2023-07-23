import {React,useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Navbar = () => {

  /* FETCH CURRENT USER DATA */
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const token = Cookies.get('jwt');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:5000/user/profile', config);
      const { username, roles } = response.data.data;
      setUserData({ username, roles });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /*LOGOUT */
  const clearCookie = () => {
    Cookies.remove('jwt'); 
    window.location.replace('/'); 
  };

  const handleLogout = () => {
    clearCookie();
  };

  return (
    <nav>
      <h2>TechNotes</h2>
      <div className='lf-nav'>
      {userData ? (
          <>
            <h5>UserName: {userData.username}</h5>
            <h5>Status: {userData.roles}</h5>
          </>
        ) : (
          <p>Loading...</p>
        )}
      <Link to="#" onClick={handleLogout}>Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
