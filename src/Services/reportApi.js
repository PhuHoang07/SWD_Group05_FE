import axiosClient from "./axios/config";

export const getAllReport = async () => {
  try {
    const response = await axiosClient.get(`/api/report/view-all`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const createReport = async (content, productPostId) => {
  try {
    const response = await axiosClient.post('/api/report/create', { content, productPostId });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const approveDenyProductPost = async (id, status) => {
  try {
    const response = await axiosClient.put(`/api/report/${id}/status?status=${status}`);
    return response.data;
  } catch (e) {
    console.error('Error approving/denying post:', e);
    throw e.response ? e.response.data : new Error('An error occurred while approving/denying the post.');
  }
};