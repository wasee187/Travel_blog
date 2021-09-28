import './header.css';

function Header() {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerTitleSM'>We travel not to scape life,</span>
        <span className='headerTitleLG'>but for life not to escape us.</span>
      </div>
      <img className='headerImg' src='/uploads/homepic.jpg' alt='headerImg' />
    </div>
  );
}

export default Header;
