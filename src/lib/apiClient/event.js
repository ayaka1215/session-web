import { axiosInstance } from "../../utils/axios.js";

export const getEventAll = () => {
  return axiosInstance.get("/events");
};

export const getEventDetail = (id) => {
  return axiosInstance.get(`/events/${id}`);
};

export const updateEvent = (id, data) => {
  return axiosInstance.put(`events/${id}`, data);
};

export const deleteEvent = (id) => {
  return axiosInstance.delete(`events/${id}`);
};
