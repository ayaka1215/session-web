import { axiosInstance } from "../../utils/axios.js";
import Cookies from "js-cookie";

export const signUp = (params) => {
  return axiosInstance.post("auth", params);
};

export const signIn = (params) => {
  return axiosInstance.post("auth/sign_in", params);
};

export const signOut = () => {
  return axiosInstance.delete("auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const getCurrentUser = () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return;
  return axiosInstance.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
