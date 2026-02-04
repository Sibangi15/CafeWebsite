import React from 'react'

function Contact() {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="/owner.jpg" alt="Our Story" className="w-full h-auto rounded-xl shadow-lg" />
                    </div>

                    <div className="text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Chef’s Story</h1>
                        <p className="text-gray-700 mb-4 text-lg">
                            At The Owl’s Hut, we are passionate about creating delectable pastries and cakes that ignite your taste buds and leave you craving for more. Our secret ingredient? Love, of course!
                        </p>
                        <p className="text-gray-700 mb-4 text-lg">
                            From the flakiest croissants to the creamiest éclairs, our master bakers craft each treat with precision and care, ensuring that every bite is a delightful experience.
                        </p>
                        <p className="text-gray-700 text-lg">
                            Join us on a journey of sweetness and satisfaction, where every bite is a celebration of flavor and joy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
