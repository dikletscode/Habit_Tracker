import axios, { AxiosError } from "axios";
import { API } from "../config/axios";
import { LoginResponse } from "../context/AuthReducer";

export interface Activity {
  id?: number;
  title: string;
  starts: Date | string;
  ends: Date | string;
  detail: string;
  category?: string;
  isConfirm?: boolean;
}

export const getActivity = (): Promise<Activity[]> => {
  return new Promise((resolve, reject) => {
    API.get("activity")
      .then((res) => {
        console.log(res, "ss");
        resolve(res.data.data);
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          reject(err.response?.data.message);
        } else {
          console.log(err.message, "sssa");
        }
      });
  });
};
export const createActivity = (obj: Activity): Promise<string> => {
  return new Promise((resolve, reject) => {
    API.post("activity", obj)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          reject(err.response?.data.message);
        } else {
          console.log(err.name);
        }
      });
  });
};
export const updateActivity = (obj: Activity, id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    API.put("activity/" + id, obj)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          reject(err.response?.data.message);
        } else {
          console.log(err);
        }
      });
  });
};
export const removeActivity = (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    API.delete("activity/" + id)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          reject(err.response?.data.message);
        } else {
          console.log(err);
        }
      });
  });
};

export interface Category {
  id: number;
  title: string;
  activity: Activity[];
}
export const getCategory = (): Promise<Category[]> => {
  return new Promise((resolve, reject) => {
    API.get("category-activity")
      .then((res) => {
        console.log(res.data);

        resolve(res.data.data);
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          reject(err.response?.data.message);
        } else {
          console.log(err);
        }
      });
  });
};
