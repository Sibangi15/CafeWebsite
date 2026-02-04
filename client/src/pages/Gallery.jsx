import React from 'react'

function Gallery() {
    return (
        <div>
            <section id="gallery" className="w-full py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">

                    <div className="text-center mb-12">
                        <h3 className="text-4xl md:text-5xl font-bold">
                            Sweet Creations Gallery
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/pizza.jpg"
                                alt="Pizza"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/coffee.jpg"
                                alt="Coffee"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/deserts.jpg"
                                alt="Deserts"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    <div className="mt-14 text-center">
                        <a
                            href="/login"
                            className="inline-block px-10 py-4 text-lg font-semibold text-white rounded-full
                   bg-black/90 hover:bg-black transition-all duration-300"
                        >
                            Order Now
                        </a>
                    </div>

                </div>
            </section>

        </div>
    )
}

export default Gallery
