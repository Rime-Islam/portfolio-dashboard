import { jwtDecode } from "jwt-decode";
import axiosInstance from "../lib/axios";
import Cookies from "js-cookie"; 

export const logout = async () => {
  Cookies.remove("accessToken");
};

export const userLogin = async (loginInfo) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, loginInfo);
    const { data } = response;

    // Set the token in a cookie
    Cookies.set("accessToken", data?.data?.token, {
      secure: "production",
      expires: 60, // 60 days
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getCurrentUser = async () => {
  const token = Cookies.get("accessToken");

  let decoded = null;

  if (token) {
    decoded = jwtDecode(token);
  }

  return decoded;
};

const handleError = (error) => {
  console.error(error);
  throw new Error(
    error?.response?.data?.message || error?.message || "An unexpected error occurred"
  );
};
