import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const menu = [
        { name: "Dashboard", path: "/admin" },
        { name: "Analytics", path: "/admin/analytics" }
    ];

    return (
        <div
            style={{
                width: "230px",
                background: "#6f42c1",
                color: "#fff",
                padding: "20px"
            }}
        >
            <h4 className="mb-4">Prenova Admin</h4>

            {menu.map((item, i) => (
                <Link
                    key={i}
                    to={item.path}
                    style={{
                        display: "block",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        textDecoration: "none",
                        color: "#fff",
                        background:
                            location.pathname.includes(item.path)
                                ? "rgba(255,255,255,0.2)"
                                : "transparent"
                    }}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
}