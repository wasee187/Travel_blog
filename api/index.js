//requiring dependencies
const express = require('express');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const catRoute = require('./routes/categories');

//app start
const app = express();

//connecting database
connectDB();
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '/images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

//router part
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', catRoute);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Backend is running');
});
