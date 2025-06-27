import axios from 'axios';

// Get token safely
const rawToken = window.localStorage.getItem('token');
const token = rawToken ? `Bearer ${rawToken}` : '';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1.0/',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: token,
  },
});

// Create a new item
export const createItem = async (item) => {
  try {
    return await api.post('admin/items', item);
    
  } catch (error) {
    throw error;
  }
};

// Get all item
export const getItems = async () => {
  try {
    return await api.get('items');
   
  } catch (error) {
    throw error;
  }
};

// Get a item by ID
export const getItemById = async (id) => {
  try {
    return await api.get(`admin/items/${id}`);
  
  } catch (error) {
    throw error;
  }
};

// Update a item
export const updateItem = async (id, item) => {
  try {
    return await api.put(`admin/items/${id}`, item);
    
  } catch (error) {
    throw error;
  }
};

// Delete a item
export const deleteItem = async (id) => {
  try {
    return await api.delete(`admin/items/${id}`);
    
  } catch (error) {
    throw error;
  }
};
