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
                            Meet Mr. John Doe, the heart and hands behind The Owl’s Hut. With a deep passion for baking and an eye for detail, he believes that every creation should tell a story of care, patience, and craftsmanship.
                        </p>
                        <p className="text-gray-700 mb-4 text-lg">
                            From delicately layered croissants to rich, refined desserts, Mr. Doe brings years of experience and dedication into every recipe, ensuring each bite is thoughtfully balanced and beautifully made.
                        </p>
                        <p className="text-gray-700 text-lg">
                            His journey is driven by a simple philosophy — create honest flavors that comfort, inspire, and turn every visit into a memorable experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
