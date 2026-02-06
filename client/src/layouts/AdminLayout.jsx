import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <SideNav />
            <main className="ml-64 w-full p-6">
                <Outlet />
            </main>
        </div>
    );
}
