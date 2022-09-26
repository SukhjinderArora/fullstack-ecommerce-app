import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  xsrfHeaderName: 'x-xsrf-token',
});

export default instance;
