import { useEffect, useState } from "react";
import api from "../../api/axios";

const UserDetails = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/api/auth/getallusers");
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="pt-20 px-4 md:px-6 pb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Users</h1>

            {/* Desktop Table (unchanged) */}
            <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-left">User ID</th>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-center">Role</th>
                            <th className="px-6 py-4 text-center">Created At</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                        {user._id}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {user.name || "—"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <RoleBadge role={user.role} />
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-600">
                                        {new Date(user.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {users.length === 0 ? (
                    <p className="text-center text-gray-500">No users found</p>
                ) : (
                    users.map((user) => (
                        <UserCard key={user._id} user={user} />
                    ))
                )}
            </div>
        </div>
    );
};

/* ===== Mobile Card ===== */
const UserCard = ({ user }) => (
    <div className="bg-white rounded-xl shadow p-4 space-y-3">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-semibold text-gray-900">
                    {user.name || "—"}
                </p>
                <p className="text-sm text-gray-600 break-all">
                    {user.email}
                </p>
            </div>
            <RoleBadge role={user.role} />
        </div>

        <div className="text-xs text-gray-500 font-mono break-all">
            ID: {user._id}
        </div>

        <div className="text-sm text-gray-600">
            Joined: {new Date(user.date).toLocaleDateString()}
        </div>
    </div>
);

/* ===== Reusable Badge ===== */
const RoleBadge = ({ role }) => (
    <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${role === "admin"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-blue-100 text-blue-700"
            }`}
    >
        {role}
    </span>
);

export default UserDetails;
