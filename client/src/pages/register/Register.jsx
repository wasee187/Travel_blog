import './register.css';
import { axiosInstance } from '../../config';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('/auth/register', {
        userName,
        email,
        password,
      });
      res.data && window.location.replace('/login');
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className='register'>
      <span className='registerTitle'> Register</span>
      <form className='registerForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type='text'
          className='registerInput'
          name='userName'
          value={userName}
          placeholder='Enter your username..'
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email</label>
        <input
          type='text'
          className='registerInput'
          name='email'
          value={email}
          placeholder='Enter your email..'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type='password'
          className='registerInput'
          name='password'
          value={password}
          placeholder='Enter your Password..'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className='registerButton' type='submit'>
          Register
        </button>
      </form>
      <button className='registerLoginButton'>
        <Link className='link' to='/login'>
          Login
        </Link>
      </button>
      {error && <span className='error'>Something went wrong !</span>}
    </div>
  );
}

export default Register;
