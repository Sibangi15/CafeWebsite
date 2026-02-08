import React from 'react'

const About = () => {
    return (
        <div>
            <div id='about' className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="/about.jpg" alt="Our Story" className="w-full h-auto rounded-xl shadow-lg" />
                    </div>

                    <div className="text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
                        <p className="text-gray-700 mb-4 text-lg">
                            At The Owl’s Hut, we’re all about creating a warm, cozy space where good coffee, comforting food, and unhurried moments come together. Every cup is brewed with care, every dish prepared with heart, and every detail designed to make you feel at home.
                        </p>
                        <p className="text-gray-700 mb-4 text-lg">
                            From freshly brewed coffees and handcrafted beverages to wholesome bites and indulgent treats, our menu is made to comfort, delight, and keep you coming back for more.
                        </p>
                        <p className="text-gray-700 text-lg">
                            Step into The Owl’s Hut and slow down for a while — a place where conversations linger, flavors shine, and every visit feels like your favorite little escape.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
