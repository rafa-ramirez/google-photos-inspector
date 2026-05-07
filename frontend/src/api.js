import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});


export const analysisAPI = {
  uploadFiles: (jsonFiles, mediaFiles) => {
    const formData = new FormData();
    jsonFiles.forEach(file => formData.append('files', file));
    if (mediaFiles && mediaFiles.length > 0) {
      formData.append('mediaFiles', JSON.stringify(mediaFiles));
    }
    return api.post('/analysis/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getHistory: () => api.get('/analysis/history'),
  getMissingLocation: () => api.get('/analysis/missing-location')
};

export default api;
