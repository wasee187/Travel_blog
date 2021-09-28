import React from 'react';
import './footer.css';

function Footer() {
  const yearNow = new Date().getFullYear();
  return (
    <div className='footer'>
      <p>
        <span>&copy;</span>Travel Blog {yearNow}
      </p>
    </div>
  );
}

export default Footer;
