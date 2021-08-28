//import mongoose
const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

async function connectDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('DataBase connected successfully');
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;
