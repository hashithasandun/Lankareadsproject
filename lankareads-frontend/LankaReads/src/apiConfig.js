export const API_BASE_URL = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== 'https://lankareads-backend.vercel.app')
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:5000';
