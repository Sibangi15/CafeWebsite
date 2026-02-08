import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalMenuItems: 0,
        totalUsers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/admin/stats");
                setStats(res.data);
            } catch (error) {
                console.error("Failed to load stats", error);
            }
        };

        fetchStats();
    }, []);
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-6 pt-24">

            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage your cafe operations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard title="Total Orders" value={stats.totalOrders} />
                <StatCard title="Menu Items" value={stats.totalMenuItems} />
                <StatCard title="Users" value={stats.totalUsers} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Orders"
                    desc="View & update order status"
                    action="View Orders"
                    to="/admin/allorders"
                />
                <DashboardCard
                    title="Manage Menu"
                    desc="Add, edit or delete menu items"
                    action="Go to Menu"
                    to="/admin/allmenu"
                />
                <DashboardCard
                    title="Users"
                    desc="View registered users here"
                    action="View Users"
                    to="/admin/allusers"
                />

            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-4xl font-bold mt-2 text-amber-900">{value}</h2>
        </div>
    );
};

const DashboardCard = ({ title, desc, action, onClick, to }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (onClick) {
            onClick(); 
        } else if (to) {
            navigate(to); 
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">{desc}</p>
            </div>
            <button onClick={handleClick} className="mt-6 bg-amber-900 hover:bg-amber-800 text-white py-2 rounded-lg transition">
                {action}
            </button>
        </div>
    );
};

export default AdminDashboard;
