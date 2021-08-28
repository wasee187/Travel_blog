import './sidebar.css';
import { useState, useEffect, useContext } from 'react';
import { axiosInstance } from '../../config';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

function Sidebar() {
  const PF = 'http://localhost:5000/images/';
  const { user } = useContext(Context);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axiosInstance.get('/categories');
      setCategories(res.data);
    };
    fetchCategories();
  }, []);
  return (
    <div className='sidebar'>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>About Me</span>
        <img
          src={user.profilePic ? PF + user.profilePic : '/uploads/user.png'}
          alt='profile Pic'
        />
        <p>{user.status && user.status}</p>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList'>
          {categories.map((cat) => (
            <Link
              to={`/?cat=${cat.catName}`}
              className='link'
              key={cat.catName}
            >
              <li className='sidebarListItem'>{cat.catName}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
