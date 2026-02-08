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

    const handleScroll = (id) => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }, 0);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">

            {/* TOP BAR */}
            <div className="flex items-center justify-between px-4 py-3 md:px-10 md:py-4">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <img src="/owllogo.jpeg" alt="Logo" className="h-10 md:h-14" />
                    <h1 className="font-serif text-lg md:text-2xl font-semibold tracking-wide text-stone-900">
                        The <span className="italic text-amber-800">Owl’s</span> Hut
                    </h1>
                </div>

                {/* DESKTOP CENTER */}
                <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
                    <li>
                        <button onClick={() => handleScroll("home")}>Home</button>
                    </li>
                    <li>
                        <button onClick={() => handleScroll("about")}>About</button>
                    </li>
                    <li>
                        <button onClick={() => handleScroll("gallery")}>Gallery</button>
                    </li>
                    <li>
                        <button onClick={() => handleScroll("contact")}>Contact</button>
                    </li>

                    {isLoggedIn && isAdmin && (
                        <li className="text-amber-800">
                            <Link to="/admin/dashboard">Admin</Link>
                        </li>
                    )}
                </ul>

                {/* DESKTOP RIGHT */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn && !isAdmin && (
                        <Link
                            to={isMenuPage ? "/orders" : "/menu"}
                            className="bg-black/80 text-white px-6 py-2 rounded-full"
                        >
                            {isMenuPage ? "Your Cart" : "Menu"}
                        </Link>
                    )}

                    {isLoggedIn ? (
                        <button
                            className="bg-black/80 text-white px-6 py-2 rounded-full"
                            onClick={() => {
                                logout();
                                navigate("/", { replace: true });
                            }}
                        >
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
            </div>

            {/*  MOBILE HORIZONTAL NAV */}
            <div className="md:hidden border-t">
                <ul className=" flex items-center gap-3 px-3 py-2 overflow-x-auto whitespace-nowrap text-sm font-medium scrollbar-hide">
                    <li>
                        <button
                            onClick={() => handleScroll("home")}
                            className="px-3 py-1 rounded-full hover:bg-stone-100"
                        >
                            Home
                        </button>
                    </li>

                    <li>
                        <button
                            onClick={() => handleScroll("about")}
                            className="px-3 py-1 rounded-full hover:bg-stone-100"
                        >
                            About
                        </button>
                    </li>

                    <li>
                        <button
                            onClick={() => handleScroll("gallery")}
                            className="px-3 py-1 rounded-full hover:bg-stone-100"
                        >
                            Gallery
                        </button>
                    </li>

                    <li>
                        <button
                            onClick={() => handleScroll("contact")}
                            className="px-3 py-1 rounded-full hover:bg-stone-100"
                        >
                            Contact
                        </button>
                    </li>

                    {isLoggedIn && isAdmin && (
                        <li className="px-3 py-1 text-amber-800">
                            <Link to="/admin/dashboard">Admin</Link>
                        </li>
                    )}

                    {isLoggedIn && !isAdmin && (
                        <li className="ml-auto">
                            <Link
                                to={isMenuPage ? "/orders" : "/menu"}
                                className="bg-black text-white px-4 py-1.5 rounded-full"
                            >
                                {isMenuPage ? "Cart" : "Menu"}
                            </Link>
                        </li>
                    )}
                    {isLoggedIn ? (
                        <button
                            className="bg-black text-white px-4 py-1.5 rounded-full"
                            onClick={() => {
                                logout();
                                navigate("/", { replace: true });
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-black text-white px-4 py-1.5 rounded-full"
                        >
                            Order Now
                        </Link>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
