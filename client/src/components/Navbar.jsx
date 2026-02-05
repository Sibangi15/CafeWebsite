import React from 'react'
import '../styles/global.css'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <div>
            <nav className="fixed top-0 left-0 z-50 w-full flex items-center px-10 py-4 bg-white/80 backdrop-blur-md shadow-sm">
                <div className="flex-1">
                    <img src="/owllogo.jpeg" alt="Logo" className="h-14" />
                </div>

                <ul className="flex gap-10 text-lg font-medium text-black">
                    <li className="nav-link cursor-pointer"><Link to="/" className="nav-link">Home</Link></li>
                    <li className="nav-link cursor-pointer"><button
                        onClick={() => {
                            document.getElementById("about")?.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }}
                        className="cursor-pointer"
                    >
                        About
                    </button>
                    </li>
                    <li className="nav-link cursor-pointer"><button
                        onClick={() => {
                            document.getElementById("gallery")?.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }}
                        className="cursor-pointer"
                    >
                        Gallery
                    </button>
                    </li>
                    <li className="nav-link cursor-pointer"><button
                        onClick={() => {
                            document.getElementById("contact")?.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }}
                        className="cursor-pointer"
                    >
                        Contact
                    </button>
                    </li>
                </ul>

                <div className="flex-1 flex justify-end">
                    {isLoggedIn && (
                        <Link
                            to="/orders"
                            className="bg-black/80 text-white px-6 py-2 rounded-full hover:bg-black transition inline-block"
                        >
                            Your Cart
                        </Link>
                    )}
                    {localStorage.getItem("token") && (
                        <button
                            onClick={handleLogout}
                            className="bg-black/80 text-white px-6 py-2 rounded-full hover:bg-black transition inline-block"
                        >
                            Logout
                        </button>
                    )}


                    {!isLoggedIn && (
                        <Link
                            to="/login"
                            className="bg-black/80 text-white px-6 py-2 rounded-full hover:bg-black transition inline-block"
                        >
                            Order Now
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
