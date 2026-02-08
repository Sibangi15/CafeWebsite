const Footer = () => {
    return (
        <div>
            <footer id="contact" className="bg-black text-white pt-14 pb-6">
                <div className="max-w-7xl mx-auto px-4">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

                        <div>
                            <h3 className="text-2xl font-bold mb-3">The Owl’s Hut</h3>
                            <p className="text-sm text-white/70">
                                Where thoughtful crafting meets timeless flavors.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-3">Contact</h4>
                            <p className="text-sm text-white/70">
                                📧 theowlshut@email.com
                            </p>
                            <p className="text-sm text-white/70 mt-2">
                                📞 +91 98765 43210
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                            <div className="flex justify-center md:justify-start gap-4">
                                <a href="/" className="hover:text-white/70 transition">Instagram</a>
                                <a href="/" className="hover:text-white/70 transition">Facebook</a>
                                <a href="/" className="hover:text-white/70 transition">Twitter</a>
                            </div>
                        </div>

                    </div>

                    <div className="border-t border-white/10 my-6"></div>
                    <p className="text-center text-sm text-white/60">
                        © 2026 The Owl’s Hut. All Rights Reserved.
                        <i>
                            {" "}Designed & Developed by{" "}
                            <a href="https://sibangi-portfolio-website.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
                                Sibangi Chakraborty
                            </a>.
                        </i>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
