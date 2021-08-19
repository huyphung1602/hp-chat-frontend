import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;

export const standardGet = async (path, params = {}, headers = {}) => {
  const { data } = await axios.get(path, { params, headers });
  return data;
}

export const standardPost = async (path, params = {}, configs = {}) => {
  configs.headers = configs.headers || {};
  const { data } = await axios.post(path, params, configs);
  return data;
}
