import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.107.253.100/api/', // Ganti dengan URL backend Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;