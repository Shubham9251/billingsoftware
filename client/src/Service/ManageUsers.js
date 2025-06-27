import axios from 'axios';

// Get token safely
const rawToken = window.localStorage.getItem('token');
const token = rawToken ? `Bearer ${rawToken}` : '';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1.0/admin/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

// Create a new user
export const createUser = async (user) => {
  try {
    return await api.post('register', user);
    
  } catch (error) {
    throw error;
  }
};

// Get all users
export const getUsers = async () => {
  try {
    return await api.get('users');
   
  } catch (error) {
    throw error;
  }
};



// Update a user
export const featchUser = async (id, user) => {
  try {
    return await api.put(`users/${id}`, user);
    
  } catch (error) {
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    return await api.delete(`users/${id}`);
    
  } catch (error) {
    throw error;
  }
};
