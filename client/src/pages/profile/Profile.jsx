import ProfileItem from '../../components/profile/profileItem';
import Sidemenu from '../../components/sidemenu/Sidemenu';
import './profile.css';

function Profile() {
  return (
    <div className='profile-container'>
      <Sidemenu />
      <ProfileItem />
    </div>
  );
}

export default Profile;
