import './dashboardItem.css';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function DashboardItem() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users/${path}/posts`);
      setUser(res.data);
      setPosts(res.data.posts);
    };
    getUser();
  }, [path]);

  return (
    <div className='dashboard-item-container'>
      {user.role ? (
        <h2>Welcome Admin {user.UserName}</h2>
      ) : (
        <h2> Welcome {user.userName}</h2>
      )}
      <table className='post-Table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
          </tr>
        </thead>
        {posts.map((post) => (
          <tbody key={post._id}>
            <tr>
              <td>
                <Link to={`/post/${post._id}`} className='link'>
                  {post.title}
                </Link>
              </td>
              <td>{new Date(post.createdAt).toDateString()}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default DashboardItem;
