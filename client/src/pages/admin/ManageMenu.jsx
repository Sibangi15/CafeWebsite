import { useEffect, useState } from "react";
import api from "../../api/axios";

const ManageMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // For modal form
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState({ name: "", price: "" });

    // Fetch menu items on mount
    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await api.get("/api/menu");
            setMenuItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch menu", error);
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setCurrentItem({ name: "", description: "", price: "", category: "", image: "" });
        setIsEditing(true);
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            await api.delete(`/api/menu/${id}`);
            setMenuItems(menuItems.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentItem._id) {
                // Edit existing
                const res = await api.put(`/api/menu/${currentItem._id}`, currentItem);
                setMenuItems(menuItems.map(item => item._id === currentItem._id ? res.data : item));
            } else {
                // Add new
                const res = await api.post("/api/menu", currentItem);
                setMenuItems([...menuItems, res.data]);
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Save failed", error);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading menu...</p>;

    return (
        <div className="p-6">
            <div className="flex pt-20 justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Menu Items</h1>
                <button className="bg-amber-900 text-white px-4 py-2 rounded-lg" onClick={handleAdd}>
                    + Add Item
                </button>
            </div>

            <div className="grid gap-4">
                {menuItems.map(item => (
                    <MenuItem
                        key={item._id}
                        item={item}
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item._id)}
                    />
                ))}
            </div>

            {/* Modal for Add/Edit */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">{currentItem._id ? "Edit Item" : "Add Item"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Name</label>
                                <input type="text" value={currentItem.name} onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} required
                                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Description</label>
                                <input type="text" value={currentItem.description} onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })} required
                                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Price</label>
                                <input type="number" value={currentItem.price} onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })} required
                                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Category</label>
                                <input type="text" value={currentItem.category} onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })} required
                                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Image URL</label>
                                <input type="text" value={currentItem.image} onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })} required
                                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" className="px-4 py-2 rounded-lg border" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 rounded-lg bg-amber-900 text-white">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const MenuItem = ({ item, onEdit, onDelete }) => (
    <div className="bg-white p-4 rounded-xl shadow grid grid-cols-[160px_1fr_auto] gap-6 items-center">

        <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded-lg" />

        <div className="grid grid-cols-2 gap-y-2 gap-x-6">
            <p className="font-semibold text-gray-800 col-span-2">{item.name}</p>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-gray-700 font-medium">₹{item.price}</p>
            <p className="text-amber-800 font-medium col-span-2">{item.category}</p>
        </div>

        <div className="flex flex-col gap-2">
            <button onClick={onEdit} className="px-3 py-1 text-sm text-blue-600 hover:underline">
                Edit
            </button>
            <button onClick={onDelete} className="px-3 py-1 text-sm text-red-600 hover:underline">
                Delete
            </button>
        </div>
    </div>
);

export default ManageMenu;
