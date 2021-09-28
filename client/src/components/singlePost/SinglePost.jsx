import { axiosInstance } from '../../config';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios';
import './singlePost.css';

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const PF = 'http://localhost:5000/images/';
  const { user } = useContext(Context);

  const [post, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/posts/' + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setCategories(res.data.categories);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { userName: user.userName },
      });
      window.location.replace('/');
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        userName: user.userName,
        title,
        description,
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch (err) {}
  };
  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        {post.photo ? (
          <img src={PF + post.photo} alt='blogPic' className='singlePostPic' />
        ) : (
          '/uploads/backpic.jpg'
        )}
        {updateMode ? (
          <input
            type='text'
            value={title}
            className='singlePostTitleInput'
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className='singlePostTitle'>
            {title}

            {post.userName === user?.userName && (
              <>
                <div className='singlePostEdit'>
                  <i
                    className='singlePostIcon fas fa-pencil-alt'
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className='singlePostIcon fas fa-trash'
                    onClick={handleDelete}
                  ></i>
                </div>
              </>
            )}
          </h1>
        )}
        <div className='singlePostInfo'>
          <span className='singlePostAuthor'>
            Author:
            <Link to={`/?userName=${post.userName}`} className='link'>
              <b>{post.userName}</b>
            </Link>
          </span>
          <span className='singlePostCategories'>
            Categories:
            {categories.map((cat, index) => (
              <span className='singlePostCategoriesItem' key={index}>
                <Link to={`/?cat=${cat}`} className='link'>
                  {cat}
                </Link>
              </span>
            ))}
          </span>
          <span className='singlePostdate'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        {updateMode ? (
          <textarea
            name=''
            id=''
            className='singlePostDesInput'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        ) : (
          <p className='singlePostDes'>{description}</p>
        )}
        {updateMode && (
          <button className='singlePostButton' onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
