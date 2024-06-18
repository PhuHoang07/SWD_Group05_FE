import axiosClient from "./axios/config";

export const registerUser = async (fullname, email, phoneNumber) => {
    try {
        const response = await axiosClient.post('/api/auth/register', {
            fullname,
            email,
            phoneNumber
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
