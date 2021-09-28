import React from 'react';
import './contact.css';

function Contact() {
  return (
    <div className='contact-container'>
      <div className='contact-body'>
        <h1>How to reach </h1>
        <p>
          Best way to contact us an email with details. We replay fast. Beside
          you may contact via other social media also.
        </p>
        <h2>Email us</h2>
        <i className='fas fa-envelope socialIcon-list-item'></i>
        <a
          href='mailto:waseesarwar187@gmail.com'
          className='socialIcon-link link'
        >
          waseesarwar187@gmail.com
        </a>
        <h3>Social Media</h3>
        <ul className='contact-socialIcon-list'>
          <li className='socialIcon-list-item'>
            <a
              href='https://www.facebook.com/wasee.sarwar'
              className='socialIcon-link'
            >
              <i className='fab fa-facebook'></i>
            </a>
          </li>
          <li className='socialIcon-list-item'>
            <a
              href='https://www.instagram.com/_w_a_s_e_e_/'
              className='socialIcon-link'
            >
              <i className='fab fa-instagram'></i>
            </a>
          </li>
          <li className='socialIcon-list-item'>
            <a href='https://github.com/wasee187' className='socialIcon-link'>
              <i className='fab fa-github-alt'></i>
            </a>
          </li>
          <li className='socialIcon-list-item'>
            <a
              href='https://www.linkedin.com/in/wasee-sarwar-384bb999/'
              className='socialIcon-link'
            >
              <i className='fab fa-linkedin'></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;
