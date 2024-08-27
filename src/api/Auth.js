import { axiosInstance } from "./axiosInstance";

export const Auth = {
    login : async (loginData) => {
        try {
            const response = await axiosInstance.post('/login',loginData)
            return response.data
        } catch (error) {
            throw error
        }
    },
    signup :  async (signupData) => {
        try {
            const response = await axiosInstance.post('/signup',signupData);
            return response.data
        } catch (error) {
            throw error
        }
    }
}