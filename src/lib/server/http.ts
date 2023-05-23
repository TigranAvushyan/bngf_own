import axios, { AxiosRequestConfig } from 'axios';
import db from '../db/db';
import { BASE_URL } from './urls';


export const http = axios.create({
  baseURL: BASE_URL + '/backend/api/',
});

http.interceptors.request.use(async (config) => {
  try {
    const token = await db.get(db.fields.JWT_TOKEN);
    if (token) {
      config.headers!.Authorization = 'JWT ' + token.access;
    }
  } catch (e) {
    console.log('DB GET TOKEN: ', e);
  }
  return config;
});

export const http_get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const res = await http.get<T>(url, config);
  return res.data;
};


export const http_post = async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
  const res = await http.post<T>(url, data, config);
  return res.data;
};


export const http_delete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const res = await http.delete<T>(url, config);
  return res.data;
};


export const http_put = async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
  const res = await http.put<T>(url, data, config);
  return res.data;
};

export const http_patch = async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
  const res = await http.patch<T>(url, data, config);
  return res.data;
};

