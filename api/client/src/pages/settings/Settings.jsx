import './settings.css';
import '../../components/sidebar/Sidebar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../../config';

function Settings() {
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  const { user, dispatch } = useContext(Context);
  const PF = 'http://localhost:5000/images/';

  const [file, setFile] = useState(null);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosInstance.get('/users/' + user._id);
      setUserName(res.data.userName);
      setEmail(res.data.email);
      setStatus(res.data.Status);
    };
    getUser();
  }, [path]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      userName,
      email,
      password,
      status,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);

      updatedUser.profilePic = filename;

      try {
        await axiosInstance.post('/upload', data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axiosInstance.put('/users/' + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/users/${user._id}`, {
        data: { userId: user._id },
      });
      window.location.replace('/');
    } catch (err) {}
  };

  let imageSrc;
  if (file) {
    imageSrc = URL.createObjectURL(file);
  } else if (user.profilePic) {
    imageSrc = PF + user.profilePic;
  } else {
    imageSrc = '/uploads/user.png';
  }

  return (
    <div className='settings'>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsUpdateTitle'>Update Your Account</span>
          <span className='settingsDeleteTitle' onClick={handleDelete}>
            Delete Your Account
          </span>
        </div>

        <form className='settingsForm' onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className='settingsPP'>
            <img src={imageSrc} alt='profilePic' />
            <label htmlFor='fileInput'>
              <i
                className='settingsPPIcon
            far fa-user-circle'
              ></i>
            </label>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <label>Your Status</label>
          <input
            type='text'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <label>User Name</label>
          <input
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='settingsSubmit' type='submit'>
            Update
          </button>
          {success && (
            <span
              style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}
            >
              Profile Updated Successfully...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

export default Settings;
