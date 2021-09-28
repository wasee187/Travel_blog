import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import SinglePost from '../../components/singlePost/SinglePost';
import './readPost.css';

function ReadPost() {
  return (
    <React.Fragment>
      <div className='single'>
        <SinglePost />
        <Sidebar />
      </div>
    </React.Fragment>
  );
}

export default ReadPost;
