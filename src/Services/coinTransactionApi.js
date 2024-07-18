import axiosClient from "./axios/config";

export const getAllTransactionByMe = async (pageIndex = 0) => {
  try {
    const response = await axiosClient.get(`/api/coin-transaction/me?pageIndex=${pageIndex}`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};
