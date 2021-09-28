import CategoryItem from '../../components/categories/CategoryItem';
import Sidemenu from '../../components/sidemenu/Sidemenu';
import './categories.css';

function Categories() {
  return (
    <div className='categories-container'>
      <Sidemenu />
      <CategoryItem />
    </div>
  );
}

export default Categories;
