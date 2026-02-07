import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', {
                email: credentials.email,
                password: credentials.password
            });

            const json = response.data;

            if (response.status === 200 && json.success) {
                const decoded = jwtDecode(json.authtoken);
                login(json.authtoken);

                if (decoded.user.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    props.showAlert("Logged in successfully", "success");
                    setTimeout(() => navigate("/menu"), 300);
                }

            } else {
                console.log("showAlert:", props.showAlert);
                props.showAlert(json.error || "Invalid credentials", "danger");
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                props.showAlert(error.response.data.error || "Invalid credentials", "danger");
            } else {
                props.showAlert("Server error. Please try again later.", "danger");
            }
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/1.jpg')] bg-cover bg-center px-4">
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Order</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email address
                        </label>
                        <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="you@example.com" />
                        <p className="text-xs text-gray-500 mt-1">We'll never share your email.</p>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input type="password" id="password" name="password" value={credentials.password} onChange={onChange} required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                            placeholder="••••••••" />
                    </div>

                    <button type="submit" className="w-full bg-amber-900 hover:bg-amber-800 text-white font-semibold py-2.5 rounded-lg transition duration-300">
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">New here?{" "}
                    <span onClick={() => navigate("/register")} className="text-amber-900 font-semibold cursor-pointer hover:underline">
                        Create an account
                    </span>
                </p>
            </div>
        </div>
    );

}

export default Login