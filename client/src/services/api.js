import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const getMe = () => api.get('/auth/me');
export const logout = () => api.post('/auth/logout');

// Dashboard
export const getDashboard = () => api.get('/dashboard');

// Content Engine
export const generateContent = (data) => api.post('/generate-content', data);

// Resume Analyzer
export const analyzeResume = (formData) => api.post('/analyze-resume', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

// Visibility Insights
export const getVisibilityInsights = () => api.get('/visibility-insights');

// Formatting Lab
export const formatContent = (data) => api.post('/format-content', data);

// User Profile
export const updateProfile = (data) => api.put('/user/profile', data);
export const getUserStats = () => api.get('/user/stats');
export const exportUserData = () => api.get('/user/export', { responseType: 'blob' });
export const deleteAccount = () => api.delete('/user');

export default api;
