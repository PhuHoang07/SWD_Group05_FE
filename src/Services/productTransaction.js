import axiosClient from "./axios/config";

export const buyProduct = async (id) => {
  try {
    const response = await axiosClient.post(`/api/product-transaction/${id}`);
    return response.data;
  } catch (e) {
    console.error('Error buy product:', e);
    throw e.response ? e.response.data : new Error('An error occurred while buying the post.');
  }
};  