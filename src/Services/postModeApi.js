import axiosClient from "./axios/config";

export const getAllPostMode = async () => {
  try {
    const response = await axiosClient.get(`/api/post-mode/view/all`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};


export const getAllPostModeActive = async () => {
  try {
    const response = await axiosClient.get(`/api/post-mode/view/active`);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const createPostMode = async (type, duration, price) => {
  try {
    const response = await axiosClient.post('/api/post-mode/create', {
      type: type,
      duration: String(duration),  // Ensure duration is a string
      price: String(price)         // Ensure price is a string
    });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};



export const deletePostMode = async (ids) => {
  try {
    const response = await axiosClient.put('/api/post-mode/soft-remove', ids);
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const updatePostMode = async (id, type, duration, price, status) => {
  try {
    const response = await axiosClient.put(`/api/post-mode/update/${id}`, { type, duration ,price, status });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};
