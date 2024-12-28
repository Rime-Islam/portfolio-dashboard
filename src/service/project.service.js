import axiosInstance from "../lib/axios";

export const addProject = async (data) => {
  try {
    const response = await axiosInstance.post(`/projects/add`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllProject = async () => {
  try {
    const response = await axiosInstance.get(`/projects`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const editSingleProject = async ({ id, data }) => {
  try {
    const response = await axiosInstance.patch(`/projects/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getSingleProject = async (id) => {
  try {
    const response = await axiosInstance.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteSingleProject = async (id) => {
  try {
    const response = await axiosInstance.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  throw new Error(error?.response?.data?.message || error?.message || "An error occurred");
};
