import { axiosInstance } from "../../utils/axios.js";

export const getUserAll = () => {
  return axiosInstance.get("/users");
};

export const getUserDetail = (id) => {
  return axiosInstance.get(`/users/${id}`);
};

export const updateUser = (id, data) => {
  return axiosInstance.put(`users/${id}`, data);
};
