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

// Create a new category
export const createCategory = async (category) => {
  try {
    return await api.post('admin/categories', category);
    
  } catch (error) {
    throw error;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    return await api.get('categories');
   
  } catch (error) {
    throw error;
  }
};

// Get a category by ID
export const getCategoryById = async (id) => {
  try {
    return await api.get(`admin/categories/${id}`);
  
  } catch (error) {
    throw error;
  }
};

// Update a category
export const updateCategory = async (id, category) => {
  try {
    return await api.put(`admin/categories/${id}`, category);
    
  } catch (error) {
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    return await api.delete(`admin/categories/${id}`);
    
  } catch (error) {
    throw error;
  }
};
