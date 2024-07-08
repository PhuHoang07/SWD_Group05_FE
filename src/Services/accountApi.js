import axiosClient from "./axios/config";

export const getAllAccount = async (pageIndex = 0, pageSize = 6, search = '') => {
  try {
    const response = await axiosClient.get(`/api/user/view-all?pageIndex=${pageIndex}&pageSize=${pageSize}&searchQuery=${search}`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const updateAccount = async (id, fullname, email, phoneNumber, role) => {
  try {
    const response = await axiosClient.put(`/api/user/update`, { id, fullname,email, phoneNumber, role});
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const deleteAccount = async (id) => {
  try {
    const response = await axiosClient.put(`/api/user/soft-remove?id=${id}`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};