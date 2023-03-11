import { axiosInstance } from "../../utils/axios.js";
import Cookies from "js-cookie";

// サインアップ（新規アカウント作成）
export const signUp = (params) => {
  return axiosInstance.post("auth", params);
};

// サインイン（ログイン）
export const signIn = (params) => {
  return axiosInstance.post("auth/sign_in", params);
};

// サインアウト（ログアウト）
export const signOut = () => {
  return axiosInstance.delete("auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  console.log(Cookies.get("_access_token"));
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
