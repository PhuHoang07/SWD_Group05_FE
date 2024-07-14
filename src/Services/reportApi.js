import axiosClient from "./axios/config";

export const getAllReport = async (searchDate = '', pageIndex = 0, pageSize = 6) => {
  try {
    const response = await axiosClient.get(`/api/report/view-all`, {
      params: { searchDate, pageIndex, pageSize }
    });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};
