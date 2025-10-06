// frontend/src/Api.js
import axios from "axios";

// Production URL via environment variable, fallback to localhost for local dev
const API = axios.create({
  baseURL: 'https://financial-trading-app-899.onrender.com/api',
  withCredentials: true // if using cookies/auth
});

export default API;
 