import DashboardItem from '../../components/dashboard/DashboardItem';
import Sidemenu from '../../components/sidemenu/Sidemenu';
import './dashboard.css';

function Dashboard() {
  return (
    <div className='dashboard-container'>
      <Sidemenu />
      <DashboardItem />
    </div>
  );
}

export default Dashboard;
