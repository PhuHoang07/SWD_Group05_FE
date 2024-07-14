import axiosClient from './axios/config';

export const getProductPostById = async (id) => {
  try {
    const response = await axiosClient.get(`/api/product-post/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred');
  }
};

export const getAllProductPostWaiting = async (pageIndex = 1, title = '', category = '', campus = '', orderPriceDescending = false, orderDateDescending = false) => {
  try {
    const response = await axiosClient.get(`/api/product-post/all`, {
      params: {
        pageIndex,
        title,
        category,
        campus,
        orderPriceDescending,
        orderDateDescending,
        status: 'Waiting',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred');
  }
};

export const approvePostMode = async (id, mode) => {
  try {
    const response = await axiosClient.put(`/api/product-post/approve/${id}`, mode);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

