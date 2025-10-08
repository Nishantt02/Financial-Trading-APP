// frontend/src/Api.js
import axios from "axios";

// Production URL via environment variable, fallback to localhost for local dev
const API = axios.create({
  baseURL: 'http://localhost:500/api',
  withCredentials: true // if using cookies/auth
});

export default API;
 