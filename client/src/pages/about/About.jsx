import React from 'react';
import './about.css';

function About() {
  return (
    <React.Fragment>
      <div className='about-container'>
        <div className='about-body'>
          <h2>About Us</h2>
          <p>
            TravelBlog is a travel website which provide you latest information
            and guide about travelling around the world. You will get
            information about best places to visit, tips and trick of
            travelling, trending news and many more things.It provides a
            platform to share your experiences with the world.
          </p>
          <p>
            It's been created for learning purpose. If you have any thoughts or
            any queries you can contact anytime.
          </p>
        </div>
        <div className='aboutUs-img'>
          <img src='/uploads/about.png' alt='aboutUs' />
        </div>
      </div>
    </React.Fragment>
  );
}

export default About;
