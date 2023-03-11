import { axiosInstance } from "../../utils/axios.js";

export const getUserAll = () => {
  return axiosInstance.get("/users");
};
