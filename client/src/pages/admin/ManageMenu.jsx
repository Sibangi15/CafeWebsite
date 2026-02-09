import { useEffect, useState } from "react";
import api from "../../api/axios";

const ManageMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState({ name: "", price: "" });

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
                const res = await api.put(`/api/menu/${currentItem._id}`, currentItem);
                setMenuItems(menuItems.map(item =>
                    item._id === currentItem._id ? res.data : item
                ));
            } else {
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
        <div className="px-4 sm:px-6 pt-20 pb-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Menu Items</h1>
                <button
                    className="bg-amber-900 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                    onClick={handleAdd}
                >
                    + Add Item
                </button>
            </div>

            {/* Menu list */}
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

            {/* Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4">
                            {currentItem._id ? "Edit Item" : "Add Item"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {["name", "description", "price", "category", "image"].map((field) => (
                                <div key={field}>
                                    <label className="block mb-1 font-medium capitalize">
                                        {field === "image" ? "Image URL" : field}
                                    </label>
                                    <input
                                        type={field === "price" ? "number" : "text"}
                                        value={currentItem[field]}
                                        onChange={(e) =>
                                            setCurrentItem({ ...currentItem, [field]: e.target.value })
                                        }
                                        required
                                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                                    />
                                </div>
                            ))}

                            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg border"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-amber-900 text-white"
                                >
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
    <div className="bg-white p-4 rounded-xl shadow
        grid grid-cols-1 sm:grid-cols-[160px_1fr_auto] gap-4 sm:gap-6 items-start sm:items-center">

        <img
            src={item.image}
            alt={item.name}
            className="h-44 sm:h-40 w-full object-cover rounded-lg"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
            <p className="font-semibold text-gray-800 sm:col-span-2">{item.name}</p>
            <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
            <p className="text-gray-700 font-medium">₹{item.price}</p>
            <p className="text-amber-800 font-medium sm:col-span-2">{item.category}</p>
        </div>

        <div className="flex sm:flex-col gap-3 sm:gap-2 mt-2 sm:mt-0">
            <button
                onClick={onEdit}
                className="px-3 py-1 text-sm text-blue-600 hover:underline"
            >
                Edit
            </button>
            <button
                onClick={onDelete}
                className="px-3 py-1 text-sm text-red-600 hover:underline"
            >
                Delete
            </button>
        </div>
    </div>
);

export default ManageMenu;
