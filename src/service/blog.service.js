import axiosInstance from "../lib/axios";


export const addBlog = async (data) => {
  try {
    const response = await axiosInstance.post(`/blogs/add`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllBlog = async () => {
  try {
    const response = await axiosInstance.get(`/blogs`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getSingleBlog = async (id) => {
  try {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const editSingleBlog = async ({ id, data }) => {
  try {
    const response = await axiosInstance.patch(`/blogs/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteSingleBlog = async (id) => {
  try {
    const response = await axiosInstance.delete(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  throw new Error(error?.response?.data?.message || error?.message || "An error occurred");
};
