import axiosClient from "./axios/config";

export const loginUser = async (email, password) => {
    try {
        const response = await axiosClient.post("/api/auth/login", {
            email: email,
            password: password,
        });
        const responseData = response.data;
        console.log(responseData);

        if (responseData) {
            const userInfo = responseData.userInfo;
            const token = responseData.token;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userInfo)); // Store user info
            return userInfo;
        } else {
            throw new Error(responseData.message || "Login failed");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            const { statusCode, message } = error.response.data;
            console.error(`Error ${statusCode}: ${message}`);
            throw new Error(message);
        } else {
            console.error("Login failed:", error);
            throw new Error("Login failed, please try again.");
        }
    }
};
