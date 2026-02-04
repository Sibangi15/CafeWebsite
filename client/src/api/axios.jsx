import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: "http://localhost:5000/api", // Base URL for all requests
    withCredentials: true, // allows sending cookies
    headers: {
        "Content-Type": "application/json", // default headers
    },
});

export default api;
