import axiosInstance from "../lib/axios";

export const addSkill = async (data) => {
  try {
    const response = await axiosInstance.post(`/skills/add`, data);
    console.log(response)
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllSkill = async () => {
  try {
    const response = await axiosInstance.get(`/skills`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const editSingleSkill = async ({ id, data }) => {
  try {
    const response = await axiosInstance.patch(`/skills/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteSingleSkill = async (id) => {
  try {
    const response = await axiosInstance.delete(`/skills/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  throw new Error(error?.response?.data?.message || error?.message || "An error occurred");
};
