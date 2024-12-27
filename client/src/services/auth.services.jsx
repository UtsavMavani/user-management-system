import { axiosInstance } from "../interceptor";

export const authentication = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
