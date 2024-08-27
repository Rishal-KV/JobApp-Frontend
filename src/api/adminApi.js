import { axiosInstance } from "./axiosInstance";

export const adminApi = {
  postJob: async (postData) => {
    try {
      const response = await axiosInstance.post("/admin/job", postData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchJob: async (id) => {
    try {
      const response = await axiosInstance.get(`/admin/job?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchSpecificJob: async (postId) => {
    try {
      const response = await axiosInstance.get(
        `/admin/updatejob?jobId=${postId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePost: async (updatedData) => {
    try {
      const response = await axiosInstance.put("/admin/updatejob", updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deletePost: async (id, creatorId) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/updatejob?jobId=${id}&creatorId=${creatorId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
