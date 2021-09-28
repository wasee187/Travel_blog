import './topbar.css';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Context } from '../../context/Context';

function Topbar() {
  const PF = 'http://localhost:5000/images/';
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    handleClick();
    window.location.replace('/login');
  };
  const handleToggle = () => {
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle-nav');
  };
  const handleClick = () => {
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    nav.classList.remove('nav-active');
    burger.classList.remove('toggle-nav');
  };
  return (
    <React.Fragment>
      <div className='topbar'>
        {/*<div className='topbarLeft'>*/}
        <Link className='link' to='/'>
          Travel
          <i className='fas fa-globe-europe fa-2x logo'></i>
          Blog
        </Link>
        {/*</div>*/}
        <ul className='nav-links'>
          <li className='nav-links-item' onClick={handleClick}>
            <Link className='link' to='/'>
              Home
            </Link>
          </li>
          <li className='nav-links-item' onClick={handleClick}>
            <Link className='link' to='/aboutUs'>
              About
            </Link>
          </li>
          <li className='nav-links-item' onClick={handleClick}>
            <Link className='link' to='/contactUs'>
              Contact
            </Link>
          </li>
          <li className='nav-links-item' onClick={handleClick}>
            <Link className='link' to='/write'>
              {user && 'Write'}
            </Link>
          </li>
          <li className='nav-links-item' onClick={handleLogout}>
            {user && 'Logout'}
          </li>
          <li className='nav-links-item' onClick={handleClick}>
            <Link className='link' to='/login'>
              {!user && 'Login'}
            </Link>
          </li>
          <li className='nav-links-item' onClick={handleClick}>
            <Link className='link' to='/register'>
              {!user && 'Register'}
            </Link>
          </li>

          {user ? (
            <Link to={`/dashboard/${user._id}`} onClick={handleClick}>
              <img
                className='topImage'
                src={
                  user.profilePic ? PF + user.profilePic : '/uploads/user.png'
                }
                alt='propic'
              />
            </Link>
          ) : (
            <div></div>
          )}
        </ul>
        <button
          className='nav-toggle'
          aria-label='toggle navigation'
          onClick={handleToggle}
        >
          <div className='burger'>
            <div className='line1'></div>
            <div className='line2'></div>
            <div className='line3'></div>
          </div>
        </button>
      </div>
    </React.Fragment>
  );
}

export default Topbar;
