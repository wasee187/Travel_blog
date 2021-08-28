import './topbar.css';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Context } from '../../context/Context';

function Topbar() {
  const PF = 'http://localhost:5000/images/';
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <div className='topbar'>
      <div className='topbarLeft'>
        Travel
        <i className='fas fa-globe-europe fa-2x logo'></i>
        Blog
      </div>
      <div className='topbarMiddle'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link className='link' to='/'>
              Home
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/'>
              About
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/'>
              Contact
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/write'>
              {user && 'Write'}
            </Link>
          </li>
          <li className='topListItem' onClick={handleLogout}>
            {user && 'Logout'}
          </li>
        </ul>
      </div>
      <div className='topbarRight'>
        {user ? (
          <Link to='/settings'>
            <img
              className='topImage'
              src={user.profilePic ? PF + user.profilePic : '/uploads/user.png'}
              alt='propic'
            />
          </Link>
        ) : (
          <ul className='topList'>
            <li className='topListItem'>
              <Link className='link' to='/login'>
                Login
              </Link>
            </li>
            <li className='topListItem'>
              <Link className='link' to='/register'>
                Register
              </Link>
            </li>
          </ul>
        )}

        <i className='fas fa-search topSearchIcon'></i>
      </div>
    </div>
  );
}

export default Topbar;
