import axiosClient from "./axios/config";

export const loginUser = async (email, password) => {
    try {
        const response = await axiosClient.post("/api/auth/login", { email, password });
        const responseData = response.data;

        if (responseData && responseData.userInfo && responseData.token) {
            const userInfo = responseData.userInfo;
            const token = responseData.token;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userInfo));
            localStorage.setItem("loginSuccess", "true");
            return userInfo;
        } else {
            throw new Error(responseData.message || "Login failed");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            const { status, title, errors, message } = error.response.data;

            if (status === 400 && title === "One or more validation errors occurred." && errors && errors.Email) {
                const emailErrorMessages = errors.Email.join(", ");
                throw new Error(emailErrorMessages);
            } else if (status === 500) {
                throw new Error("Failed to login because of some error!!!");
            } else {
                throw new Error("Failed to login because of some error!!!");
            }
        } else {
            throw new Error("Login failed, please try again.");
        }
    }
};
