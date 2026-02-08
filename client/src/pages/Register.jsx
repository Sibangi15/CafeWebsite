import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Register = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        if (password !== cpassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        }
        try {
            const response = await api.post('/api/auth/createuser', { name, email, password });
            const json = response.data;

            if (response.status === 200 && json.success) {
                sessionStorage.setItem('token', json.authtoken);
                props.showAlert("Account created successfully", "success");
                navigate("/login");
            } else {
                props.showAlert(json.error || "Unable to create account", "danger");
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                props.showAlert(error.response.data.error || "Unable to create account", "danger");
            } else {
                props.showAlert("Server error. Please try again later.", "danger");
            }
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center px-4">
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" name="name" value={credentials.name} onChange={onChange} required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Your name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" value={credentials.email} onChange={onChange} required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="you@example.com" />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type={showPassword ? "text" : "password"} name="password" value={credentials.password} onChange={onChange} required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="••••••••"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700">
                            {showPassword ? (
                                // eye-off
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-7-10-7a19.77 19.77 0 014.318-4.94M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1L18 18" />
                                </svg>
                            ) : (
                                // eye
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input type={showCPassword ? "text" : "password"} name="cpassword" value={credentials.cpassword} onChange={onChange} required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-700"
                            placeholder="••••••••"
                        />
                        <button type="button" onClick={() => setShowCPassword(!showCPassword)} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700">
                            {showCPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-7-10-7a19.77 19.77 0 014.318-4.94M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1L18 18" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <button type="submit" className="w-full bg-amber-900 hover:bg-amber-800 text-white font-semibold py-2.5 rounded-lg transition duration-300">
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="text-amber-900 font-semibold cursor-pointer hover:underline">
                        Login
                    </span>
                </p>
            </div>
        </div>
    );

}

export default Register