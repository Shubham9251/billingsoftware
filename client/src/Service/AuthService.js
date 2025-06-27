import axios from 'axios';

const API_URL = 'http://localhost:8080/login';

// Login user
export const login = async (user) => {
  return await axios.post(API_URL, user);
}

// Register user
export const register = async (user) => {
  return await axios.post('http://localhost:8080/register', user);
}