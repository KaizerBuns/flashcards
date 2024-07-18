import axios, { AxiosInstance } from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default (): AxiosInstance => {
  var axiosService = axios.create({
    baseURL: API_URL,
    timeout: 20000, // 10 second timeout
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return axiosService;
};
