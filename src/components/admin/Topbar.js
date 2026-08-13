export default function Topbar() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white">
            <h5 className="mb-0">Admin Panel</h5>

            <div>
                <span className="me-3">
                    👤 {user?.name || "Admin"}
                </span>

                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}