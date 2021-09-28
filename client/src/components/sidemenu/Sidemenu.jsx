import './sidemenu.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context.js';

function Sidemenu() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { dispatch } = useContext(Context);
  const [user, setUser] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('/users/' + id);
      setUser(res.data);
    };
    getUser();
  }, []);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    window.location.replace('/login');
  };
  return (
    <div className='sidemenu-container'>
      <ul className='sidemenu-list'>
        <li className='sidemenu-list-item'>
          <Link to={`/dashboard/${id}`} className='link'>
            {' '}
            <i className='fas fa-border-all sidemenu-list-item-icon'></i>{' '}
            Dashboard
          </Link>
        </li>
        <li className='sidemenu-list-item'>
          <Link to={`/profile/${id}`} className='link'>
            {' '}
            <i className='fas fa-id-badge sidemenu-list-item-icon'></i>Profile
          </Link>
        </li>
        {user.role ? (
          <li className='sidemenu-list-item'>
            <Link to='/category' className='link'>
              {' '}
              <i className='fas fa-id-badge sidemenu-list-item-icon'></i>
              Categories
            </Link>
          </li>
        ) : (
          ''
        )}
        <li className='sidemenu-list-item'>
          <Link to='/settings' className='link'>
            <i className='fas fa-tools sidemenu-list-item-icon'></i>
            Settings
          </Link>
        </li>
        <li className='sidemenu-list-item' onClick={handleLogout}>
          <i className='fas fa-sign-out-alt sidemenu-list-item-icon'></i>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidemenu;
