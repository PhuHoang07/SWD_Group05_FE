import axiosClient from "./axios/config";

export const getAllCampus = async (pageIndex = 0, pageSize = 10, search = '') => {
  try {
    const response = await axiosClient.get(`/api/campus/view-all?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
    // Kiểm tra cấu trúc dữ liệu trả về từ API
    if (Array.isArray(response.data)) {
      const data = response.data;
      const total = response.data.length; // hoặc bạn có thể lấy từ trường total trả về từ API nếu có

      return { data, total };
    } else {
      throw new Error('Invalid data structure returned from API');
    }
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};


export const createCampus = async (name) => {
  try {
    const response = await axiosClient.post('/api/campus/create', { name });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const deleteCampus = async (string) => {
  try {
    const response = await axiosClient.put(`/api/campus/soft-remove`,{string});
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};

export const updateCampus = async (id, name) => {
  try {
    const response = await axiosClient.put(`/api/campus/update`, { id, name });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : new Error('An error occurred');
  }
};
