import './login.css';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Context } from '../../context/Context';
import { axiosInstance } from '../../config';
import axios from 'axios';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const { isFetching, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      dispatch({ type: 'LOGIN_START' });
      const res = await axios.post('/auth/login', {
        email,
        password,
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
      setError(true);
      setErrMsg('Incorrect Information, Please try again!');
    }
  };

  return (
    <div className='login'>
      <span className='loginTitle'> Login</span>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type='text'
          className='loginInput'
          placeholder='Enter your email..'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type='password'
          className='loginInput'
          placeholder='Enter your Password..'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className='loginButton' type='submit' disabled={isFetching}>
          Login
        </button>
      </form>
      <button className='loginRegisterButton'>
        <Link className='link' to='/register'>
          Register
        </Link>
      </button>
      {error && <span className='error'>{errMsg}</span>}
    </div>
  );
}

export default Login;
