import config from "../config/config";
import { logout } from "../service/auth.service";
import axios from "axios";
import Cookies from 'js-cookie';


const axiosInstance = axios.create({
  baseURL: config.backendApi,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers = config.headers || {}; // Ensure headers object exists
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error) 
);


axiosInstance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await logout(); 
      } catch (logoutError) {
        console.error("Error during logout:", logoutError);
      }
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;