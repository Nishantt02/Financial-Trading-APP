// frontend/src/Api.js
import axios from "axios";

// Production URL via environment variable, fallback to localhost for local dev
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true // if using cookies/auth
});

export default API;
