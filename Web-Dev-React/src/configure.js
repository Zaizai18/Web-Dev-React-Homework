// src/config.js
// Switches back and forth automatically between localhost and your production deployment backend server link
export const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://your-deployed-backend-api-url.com'; // Replace this with your actual live deployed backend server API URL