import axios from 'axios';

// Get token safely
const rawToken = window.localStorage.getItem('token');
const token = rawToken ? `Bearer ${rawToken}` : '';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1.0/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

// latest order
export const latestOrder = async () => {
  try {
    return await api.get('orders/latest');
    
  } catch (error) {
    throw error;
  }
};


// create a new order
export const createOrder = async (order) => {
  try {
    return await api.post('orders', order);
    
  } catch (error) {
    throw error;
  }
};


// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    return await api.delete(`orders/${orderId}`);
    
  } catch (error) {
    throw error;
  }
};

