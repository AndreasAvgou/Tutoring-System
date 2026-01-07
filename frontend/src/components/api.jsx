import axios from 'axios';

/**
 * Pre-configured Axios instance for centralized API communication.
 */
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Target backend URL
});

/**
 * Security Setup: Injects Basic Authentication headers for development.
 * Note: btoa converts credentials to Base64 format.
 */
const token = btoa('admin:admin123');
api.defaults.headers.common['Authorization'] = `Basic ${token}`;
api.defaults.headers.common['Content-Type'] = 'application/json';

export default api;