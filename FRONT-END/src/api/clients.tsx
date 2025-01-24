import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3300', // URL base de la API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;