import axiosClient from "./axios/config";

export const getAllCategory = async (pageIndex = 0, pageSize = 5, search = '') => {
  try {
    const response = await axiosClient.get(`/api/category/view-all?pageIndex=${pageIndex}&pageSize=${pageSize}&searchQuery=${search}`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const createCategory = async (name) => {
  try {
    const response = await axiosClient.post('/api/category/create', { name });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosClient.put(`/api/category/soft-remove?id=${id}`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const updateCategory = async (id, name) => {
  try {
    const response = await axiosClient.put(`/api/category/update`, { id, name });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};
