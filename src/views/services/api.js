import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://10.107.253.100:3000/api/', // Ganti dengan URL backend Anda
  baseURL: 'http://10.10.2.73:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
