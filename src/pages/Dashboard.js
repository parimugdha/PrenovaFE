import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import "../../src/App.css";

import Navbar from "../components/user/Navbar";
import SectionHeading from "../components/user/SectionHeading";

export default function Dashboard() {

    const [modules, setModules] = useState([]);
    const [progress, setProgress] = useState({
        modules: []
    });

    useEffect(() => {

        // Fetch modules
        API.get("/modules")
            .then((res) => {
                setModules(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        // Fetch progress
        API.get("/progress")
            .then((res) => {
                setProgress(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);


    // ==========================================
    // PROGRESS CALCULATIONS
    // ==========================================

    const total = modules.length;

    const completed =
        progress.modules?.filter(
            (m) => m.status === "completed"
        ).length || 0;

    const inProgress =
        progress.modules?.filter(
            (m) => m.status === "in_progress"
        ).length || 0;

    const percentage =
        total > 0
            ? Math.round((completed / total) * 100)
            : 0;


    // ==========================================
    // GET MODULE PROGRESS
    // ==========================================

    const getModuleData = (module) => {

        return progress.modules?.find(
            (m) =>
                m.moduleId?.toString() ===
                module._id?.toString()
        );

    };


    // ==========================================
    // MODULE NUMBER
    // ==========================================

    const getModuleNumber = (index) => {

        return String(index + 1).padStart(2, "0");

    };


    // ==========================================
    // MODULE ICON
    // ==========================================

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


    return (
        <div className="prenova-app">

            {/* ==========================================
                NAVBAR
            ========================================== */}

            <Navbar />


            {/* ==========================================
                MAIN
            ========================================== */}

            <main className="prenova-main">


                {/* ==========================================
                    WELCOME HERO
                ========================================== */}

                <section className="dashboard-hero">

                    <div className="dashboard-hero-content">

                        <div className="welcome-pill">
                            <span>♡</span>
                            Learn. Prepare. Care. Thrive.
                        </div>


                        <h1>
                            Your Safe Motherhood
                            <span>
                                Learning Journey
                            </span>
                        </h1>


                        <p>
                            Learn, understand and prepare for every
                            stage of pregnancy and motherhood with
                            Prenova.
                        </p>


                        <Link
                            to="/modules"
                            className="primary-button"
                        >
                            Explore Modules
                            <span>→</span>
                        </Link>

                    </div>


                    {/* Hero visual */}

                    <div className="dashboard-hero-visual">

                        <div className="hero-circle">
                            🤰
                        </div>

                        <div className="floating-heart heart-one">
                            ♡
                        </div>

                        <div className="floating-heart heart-two">
                            ♡
                        </div>

                        <div className="baby-circle">
                            👶
                        </div>

                    </div>

                </section>


                {/* ==========================================
                    PROGRESS
                ========================================== */}

                <section className="progress-section">

                    <div className="progress-card">

                        <div className="progress-header">

                            <SectionHeading
                                label="YOUR JOURNEY"
                                title="Your Learning Progress"
                                description="Keep learning to build confidence for a healthy motherhood journey."
                            />


                            <div className="progress-percentage">
                                {percentage}%
                            </div>

                        </div>


                        {/* Progress bar */}

                        <div className="progress-track">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${percentage}%`
                                }}
                            />

                        </div>


                        {/* Progress information */}

                        <div className="progress-bottom">

                            <span>

                                <strong>
                                    {completed}
                                </strong>{" "}

                                of {total} modules completed

                            </span>


                            <span>

                                {inProgress > 0
                                    ? `${inProgress} in progress`
                                    : "Keep going ❤️"}

                            </span>

                        </div>

                    </div>

                </section>


                {/* ==========================================
                    MODULES
                ========================================== */}

                <section className="modules-section">

                    <SectionHeading
                        label="LEARNING MODULES"
                        title="Learn. Understand. Empower."
                        description="Explore each module and build your knowledge step by step."
                        rightContent={
                            <Link
                                to="/modules"
                                className="view-all-link"
                            >
                                View All →
                            </Link>
                        }
                    />


                    {/* Modules grid */}

                    <div className="modules-grid">

                        {modules.map((module, index) => {

                            const moduleData =
                                getModuleData(module);


                            let status = "not-started";

                            let buttonText =
                                "Start Module";


                            if (
                                moduleData?.status ===
                                "in_progress"
                            ) {

                                status =
                                    "in-progress";

                                buttonText =
                                    "Resume";

                            }


                            if (
                                moduleData?.status ===
                                "completed"
                            ) {

                                status =
                                    "completed";

                                buttonText =
                                    "Review";

                            }


                            return (

                                <article
                                    className={`module-card ${status}`}
                                    key={module._id}
                                >

                                    {/* Card top */}

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
                                            className={`module-status ${status}`}
                                        >

                                            {status ===
                                                "not-started" &&
                                                "Not Started"}

                                            {status ===
                                                "in-progress" &&
                                                "In Progress ⏳"}

                                            {status ===
                                                "completed" &&
                                                "Completed ✓"}

                                        </span>


                                        <h3>
                                            {module.title}
                                        </h3>


                                        {moduleData?.status ===
                                            "completed" && (

                                            <p className="module-score">

                                                Score:{" "}

                                                <strong>
                                                    {moduleData.score}
                                                </strong>

                                            </p>

                                        )}

                                    </div>


                                    {/* Button */}

                                    <Link
                                        to={`/module/${module._id}`}
                                        className={`module-button ${status}`}
                                    >

                                        {buttonText}

                                        <span>
                                            →
                                        </span>

                                    </Link>

                                </article>

                            );

                        })}

                    </div>

                </section>


                {/* ==========================================
                    CTA
                ========================================== */}

                <section className="dashboard-cta">

                    <div className="cta-icon">
                        ♡
                    </div>


                    <div className="cta-content">

                        <h2>
                            Knowledge today. Healthy tomorrow.
                        </h2>

                        <p>
                            Because every mother and every baby
                            deserves the best start.
                        </p>

                    </div>


                    <Link
                        to="/modules"
                        className="cta-button"
                    >
                        Continue Learning →
                    </Link>

                </section>

            </main>


            {/* ==========================================
                FOOTER
            ========================================== */}

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