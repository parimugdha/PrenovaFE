import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }) {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>

            <Sidebar />

            <div className="flex-grow-1 bg-light">
                <Topbar />

                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}