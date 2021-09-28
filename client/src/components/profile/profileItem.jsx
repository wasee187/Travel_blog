import './profileItem.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileItem() {
  const PF = 'http://localhost:5000/images/';
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('/users/' + path);
      setUser(res.data);
    };
    getUser();
  }, [path]);
  return (
    <div className='profile-item-container'>
      <div className='card'>
        <img
          src={user.profilePic ? PF + user.profilePic : '/uploads/user.png'}
          alt='profile Pic'
        />
        <h1>{user.userName}</h1>
        <p className='title'>{user.status && user.status}</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

export default ProfileItem;
