import './categories.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryItem() {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState('');

  const getCategories = async () => {
    const res = await axios.get('/categories');

    setCategories(res.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addCat = {
      catName: newCat,
    };
    setNewCat('');
    try {
      await axios.post('/categories', addCat);
      getCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e, id) => {
    try {
      await axios.delete(`/categories/${id}`);
      getCategories();
    } catch (err) {}
  };
  return (
    <div className='category-item-container'>
      <form className='category-add-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='categories'
          id='categories'
          value={newCat}
          placeholder='Add new category'
          onChange={(e) => setNewCat(e.target.value)}
        />
        <button className='add-cat btn' type='submit'>
          Add Category
        </button>
      </form>

      <div className='categoryList'>
        <h1>All Categories</h1>
        {categories.map((category) => (
          <span key={category._id} className='cat-span'>
            {' '}
            {category.catName}
            <i
              className='fas fa-trash cat-del'
              onClick={(e) => handleDelete(e, category._id)}
            ></i>
          </span>
        ))}
      </div>
    </div>
  );
}

export default CategoryItem;
