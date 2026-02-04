import React from 'react'
import '../styles/global.css'

function Navbar() {
    return (
        <div>
            <nav className="fixed top-0 left-0 z-50 w-full flex items-center px-10 py-4 bg-white/80 backdrop-blur-md shadow-sm">
                <div className="flex-1">
                    <img src="/owllogo.jpeg" alt="Logo" className="h-14" />
                </div>

                <ul className="flex gap-10 text-lg font-medium text-black">
                    <li className="nav-link cursor-pointer"><a href="/" className="nav-link">Home</a></li>
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
                    </li>                </ul>

                <div className="flex-1 flex justify-end">
                    <button className=" bg-black/80 text-white px-6 py-2 rounded-full hover:bg-black transition">
                        <a href="/login">Order Now</a>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
