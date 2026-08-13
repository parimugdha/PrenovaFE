import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../utils/api";
import Navbar from "../components/user/Navbar";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState({
        modules: []
    });

    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        name: "",
        whatsapp: ""
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);

            setUser(parsedUser);

            setForm({
                name: parsedUser.name || "",
                whatsapp: parsedUser.whatsapp || ""
            });
        }

        API.get("/progress")
            .then((res) => {
                setProgress(res.data || { modules: [] });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const modules = progress.modules || [];

    const completed = modules.filter(
        (module) => module.status === "completed"
    ).length;

    const inProgress = modules.filter(
        (module) => module.status === "in_progress"
    ).length;

    const totalModules = 8;

    const percentage =
        totalModules > 0
            ? Math.round((completed / totalModules) * 100)
            : 0;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Name required",
                text: "Please enter your name."
            });

            return;
        }

        try {
            /*
             * If your backend has a profile update endpoint,
             * change this to the correct endpoint.
             *
             * Example:
             * await API.put("/auth/profile", form);
             */

            const updatedUser = {
                ...user,
                name: form.name,
                whatsapp: form.whatsapp
            };

            setUser(updatedUser);

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setEditing(false);

            Swal.fire({
                icon: "success",
                title: "Profile Updated",
                text: "Your profile has been updated successfully.",
                timer: 1800,
                showConfirmButton: false
            });
        } catch (err) {
            console.log(err);

            Swal.fire({
                icon: "error",
                title: "Update failed",
                text: "Unable to update your profile."
            });
        }
    };

    const handleLogout = () => {
        Swal.fire({
            icon: "question",
            title: "Logout?",
            text: "Are you sure you want to logout?",
            showCancelButton: true,
            confirmButtonText: "Logout",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#b54d91"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href = "/login";
            }
        });
    };

    if (loading) {
        return (
            <div className="prenova-app">

                <Navbar />

                <div className="module-loading">
                    <div className="loading-heart">
                        ♡
                    </div>

                    <p>
                        Loading your profile...
                    </p>
                </div>

            </div>
        );
    }

    if (!user) {
        return (
            <div className="prenova-app">

                <Navbar />

                <main className="profile-page">

                    <div className="profile-card">

                        <div className="profile-card-header">

                            <div>
                                <h2>
                                    Profile unavailable
                                </h2>

                                <p>
                                    Please login to view your profile.
                                </p>
                            </div>

                        </div>

                        <Link
                            to="/login"
                            className="profile-save-button"
                        >
                            Login
                        </Link>

                    </div>

                </main>

            </div>
        );
    }

    return (
        <div className="prenova-app">

            {/* =================================================
                NAVBAR
            ================================================= */}

            <Navbar />


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="profile-page">

                {/* =================================================
                    PROFILE HERO
                ================================================= */}

                <section className="profile-hero">

                    <div className="profile-hero-content">

                        <div className="profile-eyebrow">
                            <span>♡</span>
                            YOUR PRENOVA PROFILE
                        </div>

                        <h1>
                            Hello,
                            <span>
                                {user.name || "there"} 🌸
                            </span>
                        </h1>

                        <p>
                            Manage your account and keep track
                            of your safe motherhood learning journey.
                        </p>

                    </div>


                    <div className="profile-avatar-wrapper">

                        <div className="profile-avatar">
                            👩
                        </div>

                    </div>

                </section>


                {/* =================================================
                    PROFILE GRID
                ================================================= */}

                <div className="profile-grid">

                    {/* =================================================
                        PROFILE INFORMATION
                    ================================================= */}

                    <section className="profile-card">

                        <div className="profile-card-header">

                            <div>

                                <h2>
                                    Personal Information
                                </h2>

                                <p>
                                    Your account information
                                </p>

                            </div>

                            {!editing && (
                                <button
                                    type="button"
                                    className="profile-edit-button"
                                    onClick={() =>
                                        setEditing(true)
                                    }
                                >
                                    ✎ Edit Profile
                                </button>
                            )}

                        </div>


                        {!editing ? (

                            <>

                                <div className="profile-info-grid">

                                    <div className="profile-info-item">

                                        <span className="profile-info-label">
                                            Full Name
                                        </span>

                                        <span className="profile-info-value">
                                            {user.name || "Not provided"}
                                        </span>

                                    </div>


                                    <div className="profile-info-item">

                                        <span className="profile-info-label">
                                            WhatsApp Number
                                        </span>

                                        <span className="profile-info-value">
                                            {user.whatsapp || "Not provided"}
                                        </span>

                                    </div>


                                    <div className="profile-info-item">

                                        <span className="profile-info-label">
                                            Account Type
                                        </span>

                                        <span className="profile-info-value">
                                            {user.role === "admin"
                                                ? "Administrator"
                                                : "Learner"}
                                        </span>

                                    </div>


                                    <div className="profile-info-item">

                                        <span className="profile-info-label">
                                            Platform
                                        </span>

                                        <span className="profile-info-value">
                                            Prenova
                                        </span>

                                    </div>

                                </div>


                                <div className="profile-completion">

                                    <div className="profile-completion-icon">
                                        ✓
                                    </div>

                                    <div className="profile-completion-content">

                                        <h4>
                                            Your account is active
                                        </h4>

                                        <p>
                                            Continue your learning journey
                                            to make the most of Prenova.
                                        </p>

                                    </div>

                                </div>

                            </>

                        ) : (

                            <form
                                className="profile-form"
                                onSubmit={handleSave}
                            >

                                <div className="profile-form-group">

                                    <label htmlFor="name">
                                        Full Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                    />

                                </div>


                                <div className="profile-form-group">

                                    <label htmlFor="whatsapp">
                                        WhatsApp Number
                                    </label>

                                    <input
                                        id="whatsapp"
                                        name="whatsapp"
                                        type="tel"
                                        value={form.whatsapp}
                                        onChange={handleChange}
                                        placeholder="Enter your WhatsApp number"
                                    />

                                </div>


                                <div className="profile-form-actions">

                                    <button
                                        type="button"
                                        className="profile-cancel-button"
                                        onClick={() => {
                                            setForm({
                                                name: user.name || "",
                                                whatsapp:
                                                    user.whatsapp || ""
                                            });

                                            setEditing(false);
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="profile-save-button"
                                    >
                                        Save Changes
                                    </button>

                                </div>

                            </form>

                        )}

                    </section>


                    {/* =================================================
                        SIDEBAR
                    ================================================= */}

                    <aside className="profile-sidebar">

                        {/* Completed */}

                        <div className="profile-stat-card">

                            <div className="profile-stat-header">

                                <div className="profile-stat-icon">
                                    ✓
                                </div>

                                <span className="profile-stat-label">
                                    COMPLETED
                                </span>

                            </div>

                            <h3 className="profile-stat-value">
                                {completed}
                            </h3>

                            <p className="profile-stat-description">
                                Learning modules completed
                            </p>

                        </div>


                        {/* In Progress */}

                        <div className="profile-stat-card">

                            <div className="profile-stat-header">

                                <div className="profile-stat-icon">
                                    ⏳
                                </div>

                                <span className="profile-stat-label">
                                    IN PROGRESS
                                </span>

                            </div>

                            <h3 className="profile-stat-value">
                                {inProgress}
                            </h3>

                            <p className="profile-stat-description">
                                Modules currently being learned
                            </p>

                        </div>


                        {/* Progress */}

                        <div className="profile-progress-card">

                            <h3>
                                Your Learning Progress
                            </h3>

                            <p>
                                Keep learning to build confidence
                                for a healthy motherhood journey.
                            </p>

                            <div className="profile-progress-header">

                                <span>
                                    Overall progress
                                </span>

                                <span className="profile-progress-percentage">
                                    {percentage}%
                                </span>

                            </div>

                            <div className="profile-progress-track">

                                <div
                                    className="profile-progress-fill"
                                    style={{
                                        width: `${percentage}%`
                                    }}
                                />

                            </div>

                        </div>


                        {/* Account Actions */}

                        <div className="profile-actions-card">

                            <h3>
                                Account
                            </h3>

                            <Link
                                to="/dashboard"
                                className="profile-action-link"
                            >
                                <span>
                                    ← Back to Dashboard
                                </span>

                                <span>
                                    →
                                </span>
                            </Link>


                            <Link
                                to="/modules"
                                className="profile-action-link"
                            >
                                <span>
                                    📖 Continue Learning
                                </span>

                                <span>
                                    →
                                </span>
                            </Link>


                            <button
                                type="button"
                                className="profile-action-link danger"
                                onClick={handleLogout}
                            >
                                <span>
                                    ↪ Logout
                                </span>

                                <span>
                                    →
                                </span>
                            </button>

                        </div>

                    </aside>

                </div>

            </main>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="prenova-footer">

                <div className="footer-brand">

                    <strong>
                        Prenova
                    </strong>

                    <span>
                        Your Safe Motherhood Learning Journey
                    </span>

                </div>


                <div className="footer-links">

                    <Link to="/about">
                        About Us
                    </Link>

                    <Link to="/modules">
                        Modules
                    </Link>

                    <Link to="/resources">
                        Resources
                    </Link>

                    <Link to="/faq">
                        FAQ
                    </Link>

                </div>


                <div className="footer-copy">

                    © {new Date().getFullYear()} Prenova

                </div>

            </footer>

        </div>
    );
}