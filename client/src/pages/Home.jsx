const Home = () => {
    return (
        <div>
            <section id="home">
                <div className=" relative min-h-screen w-full bg-[url('/1.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="relative z-10 w-full md:w-10/12 lg:w-8/12 px-4 md:px-12 py-6 text-center text-white">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4">
                            The Owl’s Hut
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            Indulge in the Sweet Symphony of Our Irresistible Pastries and Cakes
                        </p>
                        <button className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition cursor"
                            onClick={() => {
                                document.getElementById("gallery")?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });
                            }}
                        >
                            Tempt Me
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
