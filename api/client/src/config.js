import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://mws-travel-blog.herokuapp.com/api/',
});
