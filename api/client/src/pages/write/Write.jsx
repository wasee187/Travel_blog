import './write.css';
import { useState, useContext, useEffect } from 'react';
import { axiosInstance } from '../../config';
import { Context } from '../../context/Context';
import { useLocation } from 'react-router-dom';

function Write() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allCats, setAllCats] = useState([]);
  const { user } = useContext(Context);

  const location = useLocation();
  const path = location.pathname.split('/')[1];

  useEffect(() => {
    const getCategories = async () => {
      const res = await axiosInstance.get('/categories');
      setAllCats(res.data);
    };
    getCategories();
  }, [path]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      categories,
    };
    newPost.userName = user.userName;
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);

      newPost.photo = filename;

      try {
        await axiosInstance.post('/upload', data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axiosInstance.post('/posts', newPost);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {}
  };

  return (
    <div className='Write'>
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt='selectedPic'
          className='writeImg'
        />
      )}

      <form className='writeForm' onSubmit={handleSubmit}>
        <div className='writeFormGroup'>
          <label htmlFor='fileInput'>
            <i className='fas fa-plus writeIcon'></i>
          </label>
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <input
            type='text'
            placeholder='Title'
            className='writeInput'
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='writeFormGroup'>
          <label htmlFor='categories' className='catLabel'>
            Categories:
          </label>

          <select
            name='categories'
            id='categories'
            className='selectInput'
            multiple
            onChange={(e) => setCategories(e.target.value)}
          >
            {allCats.map((cat, index) => (
              <option value={cat.catName} key={index}>
                {cat.catName}
              </option>
            ))}
          </select>
        </div>
        <div className='writeFormGroup'>
          <textarea
            placeholder='Tell Your Story...'
            type='text'
            className='writeInput writeText'
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button className='writeSubmit' type='submit'>
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
