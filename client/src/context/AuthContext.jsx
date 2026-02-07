import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.user || decoded);
                
                setUser(json.user);
                sessionStorage.setItem("user", JSON.stringify(json.user));

            } catch {
                sessionStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        sessionStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        setUser(decoded.user || decoded);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
