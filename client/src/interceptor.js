import axios from "axios";
import { errorMessage, getGlobalItem } from "./utils/utils";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "x-access-token": getGlobalItem("token"),
  },
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const res = error?.response;
    if (error.response?.status !== 401) {
      errorMessage(
        res?.message || res?.data?.message || "Something went wrong"
      );
    }
  }
);
