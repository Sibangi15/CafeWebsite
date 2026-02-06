import api from "./axios";

export const fetchMenu = () => api.get("/admin/menu");
export const addMenu = (data) => api.post("/admin/menu", data);
export const updateMenu = (id, data) => api.put(`/admin/menu/${id}`, data);
export const deleteMenu = (id) => api.delete(`/admin/menu/${id}`);

export const fetchOrders = () => api.get("/admin/orders");
export const updateOrder = (id, status) =>
    api.put(`/admin/orders/${id}`, { status });
