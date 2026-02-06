import { useEffect, useState } from "react";
import api from "../../api/axios";

const UserDetails = () => {
    const [users, setUsers] = useState([]);

    // Fetch orders from backend
    const fetchUsers = async () => {
        try {
            const res = await api.get("/auth/getallusers");
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="pt-26 p-6">
            <h1 className="text-3xl font-bold mb-6">Users</h1>

            <div className="bg-white rounded-2xl shadow overflow-x-auto">
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
                                    {/* User ID */}
                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                        {user._id}
                                    </td>

                                    {/* Name */}
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {user.name || "—"}
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-4 text-gray-700">
                                        {user.email}
                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${user.role === "admin"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Created At */}
                                    <td className="px-6 py-4 text-center text-gray-600">
                                        {new Date(user.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDetails;