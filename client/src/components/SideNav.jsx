import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    Bars3Icon,
    ClipboardDocumentListIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: HomeIcon },
    { name: "Orders", path: "/admin/allorders", icon: ClipboardDocumentListIcon },
    { name: "Menu", path: "/admin/allmenu", icon: Bars3Icon },
    { name: "Users", path: "/admin/allusers", icon: UserIcon },
];


export default function SideNav() {
    return (
        <aside className="pt-26 fixed left-0 top-0 h-screen w-64 bg-linear-to-b from-amber-900 via-amber-800 to-amber-900 text-slate-100">
            <div className="px-6 py-6 border-b border-white/10 text-xl font-semibold">
                Admin Panel
            </div>

            <nav className="mt-6 flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
              ${isActive
                                ? "bg-indigo-500/20 text-white"
                                : "text-slate-300 hover:bg-white/10 hover:text-white"
                            }`
                        }
                    >
                        <item.icon
                            className={`h-5 w-5 transition-colors ${"group-hover:text-indigo-400"
                                }`}
                        />
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

