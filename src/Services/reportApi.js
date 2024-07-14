import axiosClient from "./axios/config";

export const getAllReport = async () => {
  try {
    const response = await axiosClient.get(`/api/report/view-all`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};