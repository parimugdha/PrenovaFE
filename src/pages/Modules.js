import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/user/Navbar";
import SectionHeading from "../components/user/SectionHeading";

export default function Modules() {
    const [modules, setModules] = useState([]);
    const [progress, setProgress] = useState({ modules: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [modulesRes, progressRes] = await Promise.all([
                    API.get("/modules"),
                    API.get("/progress")
                ]);

                setModules(modulesRes.data);
                setProgress(progressRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getModuleData = (moduleId) => {
        return progress.modules?.find(
            (item) =>
                item.moduleId?.toString() === moduleId?.toString()
        );
    };

    const getModuleNumber = (index) => {
        return String(index + 1).padStart(2, "0");
    };

    const getModuleIcon = (index) => {
        const icons = [
            "🤰",
            "🥗",
            "⚠️",
            "👶",
            "🍼",
            "🧠",
            "🛡️",
            "👨‍👩‍👧"
        ];

        return icons[index] || "♡";
    };

    const getStatus = (moduleData) => {
        if (!moduleData) {
            return {
                className: "not-started",
                label: "Not Started",
                button: "Start Module"
            };
        }

        if (moduleData.status === "in_progress") {
            return {
                className: "in-progress",
                label: "In Progress ⏳",
                button: "Resume"
            };
        }

        if (moduleData.status === "completed") {
            return {
                className: "completed",
                label: "Completed ✓",
                button: "Review"
            };
        }

        return {
            className: "not-started",
            label: "Not Started",
            button: "Start Module"
        };
    };

    if (loading) {
        return (
            <div className="prenova-app">
                <Navbar />

                <main className="modules-page">
                    <div className="modules-loading">
                        <div className="loading-heart">♡</div>
                        <p>Preparing your learning modules...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="prenova-app">

            {/* ================= NAVBAR ================= */}

            <Navbar />


            {/* ================= MAIN ================= */}

            <main className="modules-page">

                {/* ================= HERO ================= */}

                <section className="modules-hero">

                    <div className="modules-hero-content">

                        <div className="welcome-pill">
                            <span>♡</span>
                            Prenova Learning
                        </div>

                        <h1>
                            Learn. Understand.
                            <span>Feel Confident.</span>
                        </h1>

                        <p>
                            Explore carefully structured learning
                            modules designed to help you understand
                            pregnancy, motherhood and newborn care.
                        </p>

                    </div>

                    <div className="modules-hero-visual">

                        <div className="modules-hero-circle">
                            🤰
                        </div>

                        <div className="modules-hero-baby">
                            👶
                        </div>

                        <div className="modules-hero-heart">
                            ♡
                        </div>

                    </div>

                </section>


                {/* ================= SECTION HEADING ================= */}

                <section className="modules-list-section">

                    <div className="modules-list-header">

                        <SectionHeading
                            label="LEARNING MODULES"
                            title="Your Safe Motherhood Journey"
                            description="Learn important information step by step and build your confidence throughout your motherhood journey."
                        />

                        <Link
                            to="/dashboard"
                            className="modules-back-link"
                        >
                            ← Dashboard
                        </Link>

                    </div>


                    {/* ================= MODULE GRID ================= */}

                    {modules.length === 0 ? (

                        <div className="modules-empty">

                            <div className="modules-empty-icon">
                                ♡
                            </div>

                            <h3>
                                No modules available
                            </h3>

                            <p>
                                Learning modules will appear here
                                when they become available.
                            </p>

                        </div>

                    ) : (

                        <div className="modules-grid">

                            {modules.map((module, index) => {

                                const moduleData =
                                    getModuleData(module._id);

                                const status =
                                    getStatus(moduleData);

                                return (
                                    <article
                                        key={module._id}
                                        className={`module-card ${status.className}`}
                                    >

                                        {/* Card Top */}

                                        <div className="module-card-top">

                                            <div className="module-icon">
                                                {getModuleIcon(index)}
                                            </div>

                                            <span className="module-number">
                                                {getModuleNumber(index)}
                                            </span>

                                        </div>


                                        {/* Content */}

                                        <div className="module-content">

                                            <span
                                                className={`module-status ${status.className}`}
                                            >
                                                {status.label}
                                            </span>

                                            <h3>
                                                {module.title}
                                            </h3>

                                            {module.description && (
                                                <p>
                                                    {module.description}
                                                </p>
                                            )}

                                            {moduleData?.status ===
                                                "completed" && (
                                                <div className="module-score">
                                                    Score:
                                                    <strong>
                                                        {" "}
                                                        {moduleData.score}
                                                    </strong>
                                                </div>
                                            )}

                                        </div>


                                        {/* Button */}

                                        <Link
                                            to={`/module/${module._id}`}
                                            className={`module-button ${status.className}`}
                                        >
                                            {status.button}

                                            <span>
                                                →
                                            </span>
                                        </Link>

                                    </article>
                                );
                            })}

                        </div>
                    )}

                </section>


                {/* ================= BOTTOM CTA ================= */}

                <section className="modules-cta">

                    <div className="modules-cta-icon">
                        ♡
                    </div>

                    <div className="modules-cta-content">

                        <h2>
                            Every lesson brings you one step closer.
                        </h2>

                        <p>
                            Keep learning and build confidence for
                            a safer motherhood journey.
                        </p>

                    </div>

                    <Link
                        to="/dashboard"
                        className="cta-button"
                    >
                        View My Progress →
                    </Link>

                </section>

            </main>


            {/* ================= FOOTER ================= */}

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