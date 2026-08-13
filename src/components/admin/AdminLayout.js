import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }) {
    return (
        <div className="prenova-admin">

            <aside className="prenova-admin-sidebar">
                <Sidebar />
            </aside>

            <div className="prenova-admin-main">

                <header className="prenova-admin-topbar">
                    <Topbar />
                </header>

                <main className="prenova-admin-content">
                    {children}
                </main>

            </div>

        </div>
    );
}