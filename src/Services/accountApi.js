import axiosClient from "./axios/config";


export const getAllAccount = async (pageIndex = 0, pageSize = 6, search = '') => {
  try {
    const response = await axiosClient.get(`/api/admin/view-all?pageIndex=${pageIndex}&pageSize=${pageSize}&searchQuery=${search}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred');
  }
};

export const updateAccountAdmin = async (id, fullname, phoneNumber) => {
  try {
    const response = await axiosClient.put(`/api/admin/update?id=${id}`, { fullname, phoneNumber });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred');
  }
};

export const updateAccountUser = async (id, fullname, phoneNumber) => {
  try {
    const response = await axiosClient.put(`/api/admin/update?id=${id}`, { fullname, phoneNumber });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};


export const deleteAccount = async (id) => {
  try {
    const response = await axiosClient.put(`/api/admin/soft-remove?id=${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred');
  }
};

export const changePassword = async (oldPassword, newPassword, confirmPassword) => {
  try {
    const response = await axiosClient.post(`/api/auth/password/change`, { oldPassword, newPassword, confirmPassword});
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};