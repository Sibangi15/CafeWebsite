import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchMenu = async () => {
            const res = await api.get("/menu");
            setMenu(res.data);
            setLoading(false);
        };
        fetchMenu();
    }, []);

    if (loading) return <p>Loading menu...</p>;

    return (
        <div className="relative min-h-screen pt-20 flex items-center justify-center bg-cover bg-center px-4">
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {menu.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4 shadow">
                        <img src={item.image} className="h-40 w-full object-cover rounded" />
                        <span className="inline-block mt-3 text-xs uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-1 rounded">
                            {item.category}
                        </span>
                        <h3 className="text-lg font-semibold mt-2"> {item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{item.description}</p>
                        <p className="text-sm text-gray-600"> ₹{item.price}</p>
                        <button onClick={() => addToCart(item)} className="mt-3 w-full bg-amber-800 text-white py-2 rounded">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Menu
