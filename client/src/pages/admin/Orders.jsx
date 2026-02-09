import { useEffect, useState } from "react";
import api from "../../api/axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await api.get("/api/order/fetchorders");
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatus = async (id, newStatus) => {
        try {
            const response = await api.put(
                `/api/order/updatestatus/${id}`,
                { status: newStatus }
            );

            if (response.status === 200 && response.data.success) {
                setOrders((prev) =>
                    prev.map((order) =>
                        order._id === id ? { ...order, status: newStatus } : order
                    )
                );
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const sortedOrders = [...orders].sort((a, b) => {
        if (a.status === "delivered" && b.status !== "delivered") return 1;
        if (a.status !== "delivered" && b.status === "delivered") return -1;
        return 0;
    });

    return (
        <div className="pt-20 px-4 md:px-6 pb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Orders</h1>

            {/* Desktop Table (unchanged) */}
            <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Customer</th>
                            <th className="p-3 text-left">Items</th>
                            <th className="p-3 text-center">Total</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No orders yet
                                </td>
                            </tr>
                        ) : (
                            sortedOrders.map((order) => (
                                <OrderRow
                                    key={order._id}
                                    order={order}
                                    updateOrderStatus={updateOrderStatus}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {orders.length === 0 ? (
                    <p className="text-center text-gray-500">No orders yet</p>
                ) : (
                    sortedOrders.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            updateOrderStatus={updateOrderStatus}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

/* ===== Desktop Table Row (unchanged) ===== */
const OrderRow = ({ order, updateOrderStatus }) => {
    const itemSummary = order.items
        .map((item) => {
            const name =
                item.menuItem && typeof item.menuItem === "object"
                    ? item.menuItem.name
                    : item.menuItem;
            return `${item.quantity}x ${name || "Unknown Item"}`;
        })
        .join(", ");

    const customerName =
        order.user && typeof order.user === "object"
            ? order.user.name || order.user.email
            : order.user || "Unknown User";

    const isPending = order.status === "pending";

    return (
        <tr className="border-t hover:bg-gray-50">
            <td className="p-3">{customerName}</td>
            <td className="p-3">{itemSummary}</td>
            <td className="p-3 text-center">₹{order.totalPrice}</td>

            <td className="p-3 text-center">
                <StatusBadge status={order.status} />
            </td>

            <td className="p-3 text-center">
                <StatusButton
                    isPending={isPending}
                    onClick={() =>
                        updateOrderStatus(
                            order._id,
                            isPending ? "delivered" : "pending"
                        )
                    }
                />
            </td>
        </tr>
    );
};

/* ===== Mobile Card ===== */
const OrderCard = ({ order, updateOrderStatus }) => {
    const itemSummary = order.items
        .map((item) => {
            const name =
                item.menuItem && typeof item.menuItem === "object"
                    ? item.menuItem.name
                    : item.menuItem;
            return `${item.quantity}x ${name || "Unknown Item"}`;
        })
        .join(", ");

    const customerName =
        order.user && typeof order.user === "object"
            ? order.user.name || order.user.email
            : order.user || "Unknown User";

    const isPending = order.status === "pending";

    return (
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{customerName}</p>
                <StatusBadge status={order.status} />
            </div>

            <p className="text-sm text-gray-600">{itemSummary}</p>

            <div className="flex justify-between items-center pt-2">
                <p className="font-semibold">₹{order.totalPrice}</p>

                <StatusButton
                    isPending={isPending}
                    onClick={() =>
                        updateOrderStatus(
                            order._id,
                            isPending ? "delivered" : "pending"
                        )
                    }
                />
            </div>
        </div>
    );
};

/* ===== Reusable UI bits ===== */
const StatusBadge = ({ status }) => {
    const isPending = status === "pending";

    return (
        <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${isPending
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
                }`}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

const StatusButton = ({ isPending, onClick }) => (
    <button
        onClick={onClick}
        className={`rounded-lg px-3 py-1 text-xs font-medium ${isPending
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            }`}
    >
        {isPending ? "✓ Mark Delivered" : "⟳ Mark Pending"}
    </button>
);

export default Orders;
