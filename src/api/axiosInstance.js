import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : 'https://jobapp.nutrix.fun'
})

axiosInstance.interceptors.request.use(
    (config) => {
      // Get token from localStorage or another secure place
      const token = localStorage.getItem('Token'); // Change this as per your token storage strategy
  
      if (token) {
        // Attach token to Authorization header
        config.headers.Authorization = token;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );