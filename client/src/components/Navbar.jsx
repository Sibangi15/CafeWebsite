import React from 'react';
import '../styles/global.css';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    let isAdmin = false;
    let isLoggedIn = false;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            isLoggedIn = true;
            isAdmin = decoded.role === "admin";
        } catch (err) {
            console.error("Invalid token");
            localStorage.removeItem("token");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 z-50 w-full flex items-center px-10 py-4 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="flex-1">
                <img src="/owllogo.jpeg" alt="Logo" className="h-14" />
            </div>

            <ul className="flex gap-10 text-lg font-medium text-black">
                <li><Link to="/" className="nav-link">Home</Link></li>

                <li>
                    <button onClick={() =>
                        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                    }>
                        About
                    </button>
                </li>

                <li>
                    <button onClick={() =>
                        document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })
                    }>
                        Gallery
                    </button>
                </li>

                <li>
                    <button onClick={() =>
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }>
                        Contact
                    </button>
                </li>

                {isAdmin && (
                    <li>
                        <Link to="/admin/dashboard" className="text-red-700 font-semibold">
                            Admin
                        </Link>
                    </li>
                )}
            </ul>

            <div className="flex-1 flex justify-end gap-4">
                {isLoggedIn && (
                    <Link
                        to="/orders"
                        className="bg-black/80 text-white px-6 py-2 rounded-full hover:bg-black transition"
                    >
                        Your Cart
                    </Link>
                )}

                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="bg-black/80 text-white px-6 py-2 rounded-full hover:bg-black transition"
                    >
                        Logout
                    </button>
                )}

                {!isLoggedIn && (
                    <Link
                        to="/login"
                        className="bg-black/80 text-white px-6 py-2 rounded-full hover:bg-black transition"
                    >
                        Order Now
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;


