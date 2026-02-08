import axios from "axios";

const api = axios.create({
    baseURL: "https://cafewebsite-backend.onrender.com",
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers["auth-token"] = token;
    }
    return config;
});

export default api;

