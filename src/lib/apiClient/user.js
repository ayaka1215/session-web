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

export const permitUser = (id) => {
  return axiosInstance.put(`users/${id}`);
};

export const getPartAll = () => {
  return axiosInstance.get("/parts");
};

export const deleteUser = (id) => {
  return axiosInstance.delete(`users/${id}`);
};
