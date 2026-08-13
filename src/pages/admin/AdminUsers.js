import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import API from "../../utils/api";

export default function AdminUsers() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await API.get("/admin/users");

                console.log("Users API response:", response.data);

                setUsers(response.data.users || []);

            } catch (error) {
                console.error("Failed to load users:", error);

                Swal.fire({
                    icon: "error",
                    title: "Unable to load users",
                    text: "Something went wrong while fetching users."
                });

                setUsers([]);
            }
        };

        loadUsers();
    }, []);

    // =====================================================
    // FILTER USERS
    // =====================================================

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchValue = search.toLowerCase().trim();

            const matchesSearch =
                user.name.toLowerCase().includes(searchValue) ||
                user.whatsapp.includes(searchValue);

            const matchesStatus =
                statusFilter === "all" ||
                user.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [users, search, statusFilter]);

    // =====================================================
    // STATISTICS
    // =====================================================

    const totalUsers = users.length;

    const completedUsers = users.filter(
        (user) => user.status === "completed"
    ).length;

    const inProgressUsers = users.filter(
        (user) => user.status === "progress"
    ).length;

    const notStartedUsers = users.filter(
        (user) => user.status === "not_started"
    ).length;

    // =====================================================
    // HELPERS
    // =====================================================

    const getProgress = (user) => {
        if (!user.totalModules) return 0;

        return Math.round(
            (user.completedModules / user.totalModules) * 100
        );
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const getStatusLabel = (status) => {
        if (status === "completed") return "Completed";
        if (status === "progress") return "In Progress";

        return "Not Started";
    };

    // =====================================================
    // SEND REMINDER
    // =====================================================

    const handleReminder = async (user) => {
        try {
            // await API.post(`/admin/users/${user.id}/reminder`, user);

            Swal.fire({
                icon: "success",
                title: "Reminder Sent",
                text: `Reminder sent to ${user.name}.`,
                timer: 1800,
                showConfirmButton: false
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Unable to send WhatsApp reminder."
            });
        }
    };

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="admin-users-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="admin-users-header">

                <div>
                    <h1>User Management</h1>

                    <p>
                        Track user learning progress and module completion.
                    </p>
                </div>

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="admin-users-summary">

                <div className="admin-users-stat">

                    <span className="admin-users-stat-label">
                        Total Users
                    </span>

                    <h2 className="admin-users-stat-value">
                        {totalUsers}
                    </h2>

                    <div className="admin-users-stat-icon">
                        👥
                    </div>

                </div>


                <div className="admin-users-stat">

                    <span className="admin-users-stat-label">
                        Completed
                    </span>

                    <h2 className="admin-users-stat-value">
                        {completedUsers}
                    </h2>

                    <div className="admin-users-stat-icon">
                        ✓
                    </div>

                </div>


                <div className="admin-users-stat">

                    <span className="admin-users-stat-label">
                        In Progress
                    </span>

                    <h2 className="admin-users-stat-value">
                        {inProgressUsers}
                    </h2>

                    <div className="admin-users-stat-icon">
                        ⏳
                    </div>

                </div>


                <div className="admin-users-stat">

                    <span className="admin-users-stat-label">
                        Not Started
                    </span>

                    <h2 className="admin-users-stat-value">
                        {notStartedUsers}
                    </h2>

                    <div className="admin-users-stat-icon">
                        ○
                    </div>

                </div>

            </div>


            {/* =================================================
                SEARCH + FILTER
            ================================================= */}

            <div className="admin-users-toolbar">

                <div className="admin-users-toolbar-inner">

                    <div className="admin-users-search">

                        <span className="admin-users-search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search by name or WhatsApp number..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>


                    <select
                        className="admin-users-filter"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >
                        <option value="all">
                            All Users
                        </option>

                        <option value="completed">
                            Completed
                        </option>

                        <option value="progress">
                            In Progress
                        </option>

                        <option value="not_started">
                            Not Started
                        </option>

                    </select>

                </div>

            </div>


            {/* =================================================
                USERS TABLE
            ================================================= */}

            <div className="admin-users-table-card">

                <div className="admin-users-table-wrapper">

                    <table className="admin-users-table">

                        <thead>

                            <tr>

                                <th>
                                    User
                                </th>

                                <th>
                                    Joined
                                </th>

                                <th>
                                    Progress
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Avg. Score
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredUsers.map((user) => {

                                const progress = getProgress(user);

                                return (
                                    <tr key={user.id}>

                                        {/* USER */}

                                        <td>

                                            <div className="admin-user-info">

                                                <div className="admin-user-avatar">
                                                    {getInitials(user.name)}
                                                </div>

                                                <div>

                                                    <p className="admin-user-name">
                                                        {user.name}
                                                    </p>

                                                    <p className="admin-user-phone">
                                                        {user.whatsapp}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* JOINED */}

                                        <td>
                                            {user.joined}
                                        </td>


                                        {/* PROGRESS */}

                                        <td>

                                            <div className="admin-user-progress">

                                                <div className="admin-user-progress-top">

                                                    <span className="admin-user-progress-value">
                                                        {progress}%
                                                    </span>

                                                    <span className="admin-user-progress-count">
                                                        {user.completedModules} / {user.totalModules}
                                                    </span>

                                                </div>

                                                <div className="admin-user-progress-bar">

                                                    <div
                                                        className="admin-user-progress-fill"
                                                        style={{
                                                            width: `${progress}%`
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={`admin-user-status ${user.status === "completed"
                                                    ? "completed"
                                                    : user.status === "progress"
                                                        ? "progress"
                                                        : "not-started"
                                                    }`}
                                            >
                                                {getStatusLabel(user.status)}
                                            </span>

                                        </td>


                                        {/* SCORE */}

                                        <td>

                                            {user.averageScore > 0
                                                ? `${user.averageScore}%`
                                                : "—"}

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="admin-user-actions">

                                                <button
                                                    type="button"
                                                    className="admin-user-action"
                                                    onClick={() =>
                                                        setSelectedUser(user)
                                                    }
                                                >
                                                    View
                                                </button>


                                                {user.status !== "completed" && (
                                                    <button
                                                        type="button"
                                                        className="admin-user-action reminder"
                                                        onClick={() =>
                                                            handleReminder(user)
                                                        }
                                                    >
                                                        Remind
                                                    </button>
                                                )}

                                            </div>

                                        </td>

                                    </tr>
                                );
                            })}

                        </tbody>

                    </table>


                    {/* EMPTY */}

                    {filteredUsers.length === 0 && (

                        <div className="admin-users-empty">

                            <div className="admin-users-empty-icon">
                                🔍
                            </div>

                            <h3>
                                No users found
                            </h3>

                            <p>
                                Try changing your search or filter.
                            </p>

                        </div>

                    )}

                </div>

            </div>


            {/* =================================================
                USER DETAILS MODAL
            ================================================= */}

            {selectedUser && (

                <div
                    className="admin-user-modal-overlay"
                    onClick={() => setSelectedUser(null)}
                >

                    <div
                        className="admin-user-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* HEADER */}

                        <div className="admin-user-modal-header">

                            <h2>
                                User Details
                            </h2>

                            <button
                                type="button"
                                className="admin-user-modal-close"
                                onClick={() =>
                                    setSelectedUser(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        {/* BODY */}

                        <div className="admin-user-modal-body">

                            {/* PROFILE */}

                            <div className="admin-modal-profile">

                                <div className="admin-modal-avatar">
                                    {getInitials(selectedUser.name)}
                                </div>

                                <div>

                                    <h3>
                                        {selectedUser.name}
                                    </h3>

                                    <p>
                                        WhatsApp: {selectedUser.whatsapp}
                                    </p>

                                    <p>
                                        Joined: {selectedUser.joined}
                                    </p>

                                </div>

                            </div>


                            {/* OVERALL */}

                            <h4 className="admin-modal-section-title">
                                Overall Progress
                            </h4>

                            <div className="admin-modal-module">

                                <div className="admin-modal-module-top">

                                    <span className="admin-modal-module-name">
                                        Course Completion
                                    </span>

                                    <span className="admin-modal-module-score">
                                        {getProgress(selectedUser)}%
                                    </span>

                                </div>

                                <div className="admin-user-progress-bar">

                                    <div
                                        className="admin-user-progress-fill"
                                        style={{
                                            width: `${getProgress(
                                                selectedUser
                                            )}%`
                                        }}
                                    />

                                </div>

                            </div>


                            {/* MODULES */}

                            <h4
                                className="admin-modal-section-title"
                                style={{ marginTop: "22px" }}
                            >
                                Module Progress
                            </h4>


                            {selectedUser.modules.map((module, index) => (

                                <div
                                    className="admin-modal-module"
                                    key={index}
                                >

                                    <div className="admin-modal-module-top">

                                        <span className="admin-modal-module-name">
                                            {module.name}
                                        </span>

                                        <span className="admin-modal-module-score">

                                            {module.status === "completed"
                                                ? `${module.score}%`
                                                : getStatusLabel(
                                                    module.status ===
                                                        "in_progress"
                                                        ? "progress"
                                                        : "not_started"
                                                )}

                                        </span>

                                    </div>


                                    {module.status !== "not_started" && (

                                        <div className="admin-user-progress-bar">

                                            <div
                                                className="admin-user-progress-fill"
                                                style={{
                                                    width:
                                                        module.status ===
                                                            "completed"
                                                            ? "100%"
                                                            : "50%"
                                                }}
                                            />

                                        </div>

                                    )}

                                </div>

                            ))}


                            {/* REMINDER */}

                            {selectedUser.status !== "completed" && (

                                <div className="admin-reminder-panel">

                                    <h4>
                                        Learning Reminder
                                    </h4>

                                    <p>
                                        This user has not completed all
                                        available modules. You can send
                                        them a reminder to continue their
                                        learning journey.
                                    </p>

                                    <button
                                        type="button"
                                        className="admin-reminder-button"
                                        onClick={() =>
                                            handleReminder(selectedUser)
                                        }
                                    >
                                        Send Reminder to{" "}
                                        {selectedUser.name}
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}