import axios, { AxiosError } from "axios";
import { deleteValue } from "./secureStore";

export const API = axios.create({
  baseURL: "http://192.168.1.10:2022/api/v1/",
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
API.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    if (err.response!.status === 403) {
      deleteValue("data");
    } else {
      return Promise.reject(err);
    }
  }
);
