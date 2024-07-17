import axiosClient from "./axios/config";

export const getAllCoinPack = async () => {
  try {
    const response = await axiosClient.get(`/api/coin-pack/view/all`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const getAllCoinPackActive = async () => {
  try {
    const response = await axiosClient.get(`/api/coin-pack/view/active`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const createCoinPack = async (coinAmount, price) => {
  try {
    const response = await axiosClient.post('/api/coin-pack/create', { coinAmount, price });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const deleteCoinPack = async (ids) => {
  try {
    const response = await axiosClient.put('/api/coin-pack/soft-remove', ids);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const updateCoinPack = async (id, coinAmount, price, status) => {
  try {
    const response = await axiosClient.put(`/api/coin-pack/update/${id}`, { coinAmount, price, status });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const payPack = async (coinPackId, redirectUrl) => {
  try {
    const response = await axiosClient.post('/api/coin-transaction', {coinPackId, redirectUrl}); 
    return response;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};


export const paymentSuccess = async (transactId, status) => {
  try {
    const response = await axiosClient.put('/api/coin-transaction', {transactId, status}); 
    return response;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

