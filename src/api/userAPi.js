import { axiosInstance } from "./axiosInstance";

export const userApi = {
  // Function to fetch posts with optional filters
  fetchPost: async (filters = {}) => {
    try {
      // Construct the query string based on the filters
      const queryParams = new URLSearchParams(filters).toString();

      // Make the API call with the query parameters
      const response = await axiosInstance.get(`/post?${queryParams}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error; // Re-throw error to be handled by the calling code
    }
  },

  // Function to apply for a job
  applyForJob: async (jobData) => {
    try {
      // Make the API call to apply for a job
      const response = await axiosInstance.post("/job", jobData);
      return response.data;
    } catch (error) {
      throw error; // Re-throw error to be handled by the calling code
    }
  },

  fetchApplication : async(userId) => {
    try {
      const response = await axiosInstance.get(`/job?userId=${userId}`);
      return response.data
    } catch (error) {
      throw error
    }
   
  }
};
