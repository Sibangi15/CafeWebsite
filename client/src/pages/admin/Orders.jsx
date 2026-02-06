// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// const Orders = () => {
//     const [orders, setOrders] = useState([]);

//     // Fetch orders from backend
//     const fetchOrders = async () => {
//         try {
//             const res = await api.get("/order/fetchorders");
//             setOrders(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     // Mark an order as delivered
//     const markDelivered = async (id) => {
//         try {
//             const response = await api.put(`/order/updatestatus/${id}`, { status: "delivered" });
//             if (response.status === 200 && response.data.success) {
//                 setOrders((prev) =>
//                     prev.map((order) =>
//                         order._id === id ? { ...order, status: "Delivered" } : order
//                     )
//                 );
//             }
//         } catch (error) {
//             if (error.response) {
//                 console.error("Server response:", error.response.data);
//             } else {
//                 console.error("Error updating order:", error);
//             }
//         }
//     };


//     return (
//         <div className="pt-20">
//             <div className="p-4 md:p-6">
//                 <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
//                     Orders
//                 </h1>

//                 <div className="bg-white rounded-xl shadow overflow-x-auto">
//                     <table className="min-w-full">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="p-3 text-left text-sm md:text-base">Customer</th>
//                                 <th className="p-3 text-left text-sm md:text-base">Items</th>
//                                 <th className="p-3 text-center text-sm md:text-base">Total</th>
//                                 <th className="p-3 text-center text-sm md:text-base">Status</th>
//                                 <th className="p-3 text-center text-sm md:text-base">Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {orders.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={5} className="p-4 text-center text-gray-500">
//                                         No orders yet
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 orders.map((order) => (
//                                     <OrderRow
//                                         key={order._id}
//                                         order={order}
//                                         markDelivered={markDelivered}
//                                     />
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const OrderRow = ({ order, markDelivered }) => {
//     // Safely get item names
//     const itemSummary = order.items
//         .map((item) => {
//             const itemName =
//                 item.menuItem && typeof item.menuItem === "object"
//                     ? item.menuItem.name || "Unknown Item"
//                     : item.menuItem || "Unknown Item";
//             return `${item.quantity}x ${itemName}`;
//         })
//         .join(", ");

//     // Safely get customer name
//     const customerName =
//         order.user && typeof order.user === "object"
//             ? order.user.name || order.user.email || "Unknown User"
//             : order.user || "Unknown User";

//     return (
//         <tr className="border-t hover:bg-gray-50">
//             <td className="p-3 text-sm md:text-base">{customerName}</td>
//             <td className="p-3 text-sm md:text-base">{itemSummary}</td>
//             <td className="p-3 text-center text-sm md:text-base">₹{order.totalPrice}</td>
//             <td className="p-3 text-center">
//                 <span
//                     className={`px-2 py-1 rounded-full text-xs md:text-sm ${order.status === "Delivered"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                         }`}
//                 >
//                     {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                 </span>
//             </td>
//             <td className="p-3 text-center">
//                 {order.status !== "Delivered" && (
//                     <button
//                         onClick={() => markDelivered(order._id)}
//                         className="text-green-600 text-xs md:text-sm hover:underline"
//                     >
//                         Mark Delivered
//                     </button>
//                 )}
//             </td>
//         </tr>
//     );
// };



// export default Orders;

import { useEffect, useState } from "react";
import api from "../../api/axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    // Fetch orders
    const fetchOrders = async () => {
        try {
            const res = await api.get("/order/fetchorders");
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Update order status (pending <-> delivered)
    const updateOrderStatus = async (id, newStatus) => {
        try {
            const response = await api.put(
                `/order/updatestatus/${id}`,
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
        <div className="pt-22">
            <div className="p-4 md:p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                    Orders
                </h1>

                <div className="bg-white rounded-xl shadow overflow-x-auto">
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
            </div>
        </div>
    );
};

const OrderRow = ({ order, updateOrderStatus }) => {
    // Item summary
    const itemSummary = order.items
        .map((item) => {
            const name =
                item.menuItem && typeof item.menuItem === "object"
                    ? item.menuItem.name
                    : item.menuItem;
            return `${item.quantity}x ${name || "Unknown Item"}`;
        })
        .join(", ");

    // Customer name
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
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${isPending
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                        }`}
                >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
            </td>

            <td className="p-3 text-center">
                {isPending ? (
                    <button
                        onClick={() => updateOrderStatus(order._id, "delivered")}
                        className="rounded-lg bg-green-100 px-3 py-1 text-xs text-green-700 hover:bg-green-200"
                    >
                        ✓ Mark Delivered
                    </button>
                ) : (
                    <button
                        onClick={() => updateOrderStatus(order._id, "pending")}
                        className="rounded-lg bg-yellow-100 px-3 py-1 text-xs text-yellow-700 hover:bg-yellow-200"
                    >
                        ⟳ Mark Pending
                    </button>
                )}
            </td>
        </tr>
    );
};

export default Orders;


