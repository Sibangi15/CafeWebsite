import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const isLoggedIn = !!user;
    const isAdmin = user?.role === "admin";
    const isMenuPage = location.pathname === "/menu";

    return (
        <nav className="fixed top-0 left-0 z-50 w-full grid grid-cols-3 items-center px-10 py-4 bg-white/80 backdrop-blur-md shadow-sm">

            {/* LEFT */}
            <div className="flex items-center gap-3 justify-start">
                <img src="/owllogo.jpeg" alt="Logo" className="h-14" />
                <h1 className="group font-serif text-2xl font-semibold tracking-wide text-stone-900">
                    The <span className="italic text-amber-800">Owl’s</span> Hut
                </h1>
            </div>

            {/* CENTER */}
            <ul className="flex justify-center items-center gap-10 text-lg font-medium">
                <li className="nav-link">
                    <button
                        onClick={() => {
                            navigate("/");
                            setTimeout(() => {
                                document
                                    .getElementById("home")
                                    ?.scrollIntoView({ behavior: "smooth" });
                            }, 0);
                        }}
                    >
                        Home
                    </button>
                </li>

                {["about", "gallery", "contact"].map((id) => (
                    <li key={id} className="nav-link">
                        <button
                            onClick={() =>
                                document
                                    .getElementById(id)
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </button>
                    </li>
                ))}

                {isLoggedIn && isAdmin && (
                    <li className="nav-link text-amber-800">
                        <Link to="/admin/dashboard">Admin</Link>
                    </li>
                )}
            </ul>

            {/* RIGHT */}
            <div className="flex items-center justify-end gap-4 whitespace-nowrap">
                {isLoggedIn && (
                    <span className="text-sm italic text-stone-700">
                        Welcome, <span className="ml-1 font-semibold text-amber-800">{user.name}</span>
                    </span>
                )}

                {isLoggedIn && !isAdmin && (
                    <Link
                        to={isMenuPage ? "/orders" : "/menu"}
                        className="bg-black/80 text-white px-6 py-2 rounded-full"
                    >
                        {isMenuPage ? "Your Cart" : "Menu"}
                    </Link>
                )}

                {isLoggedIn ? (
                    < button className="bg-black/80 text-white px-6 py-2 rounded-full"
                        onClick={() => {
                            logout();
                            navigate("/", { replace: true });
                        }}>
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-black/80 text-white px-6 py-2 rounded-full"
                    >
                        Order Now
                    </Link>
                )}
            </div>
        </nav >
    );
};

export default Navbar;



