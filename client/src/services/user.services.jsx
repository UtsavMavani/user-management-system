import { axiosInstance } from "../interceptor";
import { successMessage } from "../utils/utils";

export const getUserList = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return {
      data: response?.data?.data?.records,
      count: response?.data?.data?.count,
    };
  } catch ({ error }) {
    console.error(error);
  }
};

export const createUser = async (data) => {
  try {
    const response = await axiosInstance.post("/user", data);
    successMessage(response?.data?.message);
    return response;
  } catch ({ error }) {
    console.error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    successMessage(response?.data?.message);
    return response;
  } catch ({ error }) {
    console.error(error);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response?.data?.data;
  } catch ({ error }) {
    console.error(error);
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/user/${id}`, data);
    successMessage(response?.data?.message);
    return response;
  } catch ({ error }) {
    console.error(error);
  }
};
