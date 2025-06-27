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


// create Razorpay Order
export const createRazorpayOrder = async (order) => {
  try {
    return await api.post('payments/create-order', order);
    
  } catch (error) {
    throw error;
  }
};


//verifyPayment
export const verifyPayment = async (paymentData) => {
  try {
    return await api.post('payments/verify', paymentData);
    
  } catch (error) {
    throw error;
  }
};

