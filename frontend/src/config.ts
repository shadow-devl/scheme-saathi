// Configuration file for frontend environment variables
export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://scheme-saathi-backend-cj5n.onrender.com' : 'http://localhost:3001');
