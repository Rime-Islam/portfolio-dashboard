import axiosInstance from "../lib/axios";

export const addExperience= async (data) => {
  try {
    const response = await axiosInstance.post(`/experiences/add`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllExperience= async () => {
  try {
    const response = await axiosInstance.get(`/experiences`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const editSingleExperience= async ({ id, data }) => {
  try {
    const response = await axiosInstance.patch(`/experiences/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getSingleExperience= async (id) => {
  try {
    const response = await axiosInstance.get(`/experiences/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteSingleExperience= async (id) => {
  try {
    const response = await axiosInstance.delete(`/experiences/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  throw new Error(error?.response?.data?.message || error?.message || "An error occurred");
};
