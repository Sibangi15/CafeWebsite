import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);

        if (decoded.user.role !== "admin") {
            return <Navigate to="/" />;
        }

        return children;
    } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to="/login" />;
    }
};

export default AdminRoute;


