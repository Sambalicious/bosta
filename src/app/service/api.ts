import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface IAxios {
  url: string;
  config?: AxiosRequestConfig;
  data?: unknown;
}

const instance = axios.create({
  baseURL: "https://swapi.dev/api/", // process.env.NEXT_PUBLIC_BASE_URL,
});

const api = (http: AxiosInstance) => {
  return {
    get: <T>({ url, config }: IAxios) => {
      return http.get<T>(url, config);
    },

    delete: <T>({ url, config }: IAxios) => {
      return http.delete<T>(url, config);
    },
    post: <S>({ url, data, config }: IAxios) => {
      return http.post<S>(url, data, config);
    },
    put: <T>({ url, data, config }: IAxios) => {
      return http.put<T>(url, data, config);
    },
    patch: <T>({ url, data, config }: IAxios) => {
      return http.patch<T>(url, data, config);
    },
  };
};

export default api(instance);
