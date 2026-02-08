import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/axios";

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice
    } = useContext(CartContext);

    const placeOrder = async () => {
        try {
            await api.post("/order/addorder", {
                items: cartItems.map((i) => ({
                    menuItem: i._id,
                    quantity: i.quantity
                }))
            });

            clearCart();
            alert("Order placed successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to place order");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-28 text-center">
                <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
            </div>
        );
    }

    return (
        <div className="pt-28 max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center justify-between bg-white shadow rounded-lg p-4">
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-500">₹{item.price} each</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="number" min="1" value={item.quantity}
                                onChange={(e) =>
                                    updateQuantity(item._id, +e.target.value)
                                }
                                className="w-16 border rounded px-2 py-1"
                            />

                            <button onClick={() => removeFromCart(item._id)} className="text-red-600 hover:underline">
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
                <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
                <button onClick={placeOrder}
                    className="bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Cart;
