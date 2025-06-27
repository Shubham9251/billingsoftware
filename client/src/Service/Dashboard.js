import axios from 'axios';

// get token
const rowToken = window.localStorage.getItem('token');
const token = rowToken ? `Bearer ${rowToken}` : '';

// Create axios instance

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1.0/',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: token,
  },
})


// get all orders
export const getDashboardData = async () => {
    try {
        return await api.get('dashboard')
    } catch (error) {
        throw error;
    }
};