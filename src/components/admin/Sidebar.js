import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const menu = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: "⌂"
        },
        {
            name: "Analytics",
            path: "/admin/analytics",
            icon: "📊"
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: "👥"
        }
    ];

    return (
        <div className="admin-sidebar-content">

            <div className="admin-sidebar-brand">
                <div className="admin-sidebar-logo">
                    ♡
                </div>

                <div>
                    <h2>Prenova</h2>
                    <span>Admin Panel</span>
                </div>
            </div>

            <nav className="admin-sidebar-nav">
                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/admin"}
                    >
                        <span className="admin-nav-icon">
                            {item.icon}
                        </span>

                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="admin-sidebar-bottom">
                <NavLink to="/dashboard">
                    <span className="admin-nav-icon">←</span>
                    <span>User Dashboard</span>
                </NavLink>
            </div>

        </div>
    );
}