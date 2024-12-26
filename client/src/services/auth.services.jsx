import { axiosInstance } from "../interceptor";
import { successMessage } from "../utils/utils";

export const authentication = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
