import axios from "axios";
const baseURL = process.env.REACT_APP_QUICKFIX_API;
//const baseURL = "http://localhost:5324/quickfix";
const quickFixAPI = axios.create({
  baseURL: baseURL,
  Header: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "content-Type": "application/json; charset=UTF-8",
  },
  Credentials: true,
});

export default quickFixAPI;

export const configartion = (token) => {
  quickFixAPI.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const resetConfigartion = () => {
  quickFixAPI.interceptors.request.clear();
  quickFixAPI.interceptors.response.clear();
};
