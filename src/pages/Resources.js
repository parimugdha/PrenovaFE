import { Link } from "react-router-dom";

import Navbar from "../components/user/Navbar";
import SectionHeading from "../components/user/SectionHeading";

export default function Resources() {
    const resources = [
        {
            icon: "🤰",
            title: "Pregnancy & Antenatal Care",
            description:
                "Learn about pregnancy changes, antenatal visits, routine care and preparing for a healthy pregnancy.",
            action: "Explore Module",
            link: "/modules"
        },
        {
            icon: "🥗",
            title: "Nutrition & Healthy Lifestyle",
            description:
                "Understand the importance of balanced nutrition, healthy habits and lifestyle choices during pregnancy.",
            action: "Learn More",
            link: "/modules"
        },
        {
            icon: "⚠️",
            title: "Pregnancy Danger Signs",
            description:
                "Learn to recognize important warning signs during pregnancy and understand when professional care may be needed.",
            action: "Learn More",
            link: "/modules"
        },
        {
            icon: "👶",
            title: "Labour & Birth",
            description:
                "Explore useful information about labour, childbirth and preparing yourself and your family for birth.",
            action: "Learn More",
            link: "/modules"
        },
        {
            icon: "🍼",
            title: "Newborn & Postnatal Care",
            description:
                "Discover essential information about caring for yourself and your baby after delivery.",
            action: "Learn More",
            link: "/modules"
        },
        {
            icon: "🧠",
            title: "Mental Wellbeing",
            description:
                "Learn about emotional wellbeing, common feelings during motherhood and the importance of seeking support.",
            action: "Learn More",
            link: "/modules"
        }
    ];

    const usefulResources = [
        {
            icon: "🏥",
            title: "Talk to a Healthcare Professional",
            description:
                "For personal medical advice, diagnosis or treatment, always consult a qualified healthcare professional.",
            label: "Professional Care"
        },
        {
            icon: "📖",
            title: "Keep Learning",
            description:
                "Use Prenova's learning modules to build your knowledge step by step throughout your motherhood journey.",
            label: "Prenova Learning"
        },
        {
            icon: "👨‍👩‍👧",
            title: "Involve Your Family",
            description:
                "Share important knowledge with your partner and family so they can better support you during pregnancy and motherhood.",
            label: "Family Support"
        }
    ];

    return (
        <div className="prenova-app">

            {/* ================= NAVBAR ================= */}

            <Navbar />


            {/* ================= MAIN ================= */}

            <main className="resources-page">

                {/* ================= HERO ================= */}

                <section className="resources-hero">

                    <div className="resources-hero-content">

                        <div className="welcome-pill">
                            <span>♡</span>
                            Prenova Resources
                        </div>

                        <h1>
                            Helpful knowledge for
                            <span> every step of motherhood.</span>
                        </h1>

                        <p>
                            Explore carefully organized learning resources
                            to help you understand pregnancy, childbirth,
                            newborn care and your wellbeing.
                        </p>

                        <div className="resources-hero-actions">

                            <Link
                                to="/modules"
                                className="primary-button"
                            >
                                Explore Modules
                                <span>→</span>
                            </Link>

                        </div>

                    </div>


                    {/* Hero Illustration */}

                    <div className="resources-hero-visual">

                        <div className="resources-main-circle">
                            📚
                        </div>

                        <div className="resources-floating-card resource-card-one">
                            <span>♡</span>
                            Learn
                        </div>

                        <div className="resources-floating-card resource-card-two">
                            <span>✓</span>
                            Prepare
                        </div>

                        <div className="resources-small-circle">
                            👶
                        </div>

                    </div>

                </section>


                {/* ================= INTRO ================= */}

                <section className="resources-intro">

                    <SectionHeading
                        label="LEARNING RESOURCES"
                        title="Knowledge you can use."
                        description="Prenova brings important maternal and newborn health topics together in one simple and accessible place."
                    />

                </section>


                {/* ================= RESOURCE GRID ================= */}

                <section className="resources-grid-section">

                    <div className="resources-grid">

                        {resources.map((resource, index) => (

                            <article
                                className="resource-card"
                                key={index}
                            >

                                <div className="resource-card-top">

                                    <div className="resource-icon">
                                        {resource.icon}
                                    </div>

                                    <span className="resource-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                </div>


                                <div className="resource-card-content">

                                    <h3>
                                        {resource.title}
                                    </h3>

                                    <p>
                                        {resource.description}
                                    </p>

                                </div>


                                <Link
                                    to={resource.link}
                                    className="resource-link"
                                >
                                    {resource.action}
                                    <span>→</span>
                                </Link>

                            </article>

                        ))}

                    </div>

                </section>


                {/* ================= HOW TO USE ================= */}

                <section className="resources-approach">

                    <div className="resources-approach-header">

                        <SectionHeading
                            label="HOW TO USE PRENOVA"
                            title="Learn at your own pace."
                            description="You don't need to learn everything at once. Take one topic at a time and build your understanding gradually."
                        />

                    </div>


                    <div className="resources-steps">

                        <div className="resources-step">

                            <div className="resources-step-number">
                                01
                            </div>

                            <div className="resources-step-icon">
                                🔎
                            </div>

                            <h3>
                                Explore
                            </h3>

                            <p>
                                Find a topic that is relevant to
                                your current stage of pregnancy
                                or motherhood.
                            </p>

                        </div>


                        <div className="resources-step">

                            <div className="resources-step-number">
                                02
                            </div>

                            <div className="resources-step-icon">
                                📖
                            </div>

                            <h3>
                                Learn
                            </h3>

                            <p>
                                Read the learning content and
                                watch available educational videos.
                            </p>

                        </div>


                        <div className="resources-step">

                            <div className="resources-step-number">
                                03
                            </div>

                            <div className="resources-step-icon">
                                📝
                            </div>

                            <h3>
                                Check
                            </h3>

                            <p>
                                Use the knowledge checks to
                                reinforce what you have learned.
                            </p>

                        </div>


                        <div className="resources-step">

                            <div className="resources-step-number">
                                04
                            </div>

                            <div className="resources-step-icon">
                                🌸
                            </div>

                            <h3>
                                Continue
                            </h3>

                            <p>
                                Return whenever you want to
                                continue building your knowledge.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= USEFUL SUPPORT ================= */}

                <section className="resources-support">

                    <SectionHeading
                        label="ADDITIONAL SUPPORT"
                        title="Knowledge is stronger with support."
                        description="Learning is an important part of preparation, but you don't have to go through motherhood alone."
                    />


                    <div className="resources-support-grid">

                        {usefulResources.map((resource, index) => (

                            <div
                                className="resources-support-card"
                                key={index}
                            >

                                <div className="resources-support-icon">
                                    {resource.icon}
                                </div>

                                <span className="resources-support-label">
                                    {resource.label}
                                </span>

                                <h3>
                                    {resource.title}
                                </h3>

                                <p>
                                    {resource.description}
                                </p>

                            </div>

                        ))}

                    </div>

                </section>


                {/* ================= IMPORTANT NOTE ================= */}

                <section className="resources-note">

                    <div className="resources-note-icon">
                        ℹ
                    </div>

                    <div>

                        <h3>
                            Important health information
                        </h3>

                        <p>
                            Prenova is an educational platform.
                            The information provided here is intended
                            to support learning and awareness and should
                            not replace medical advice, diagnosis or
                            treatment from a qualified healthcare
                            professional.
                        </p>

                    </div>

                </section>


                {/* ================= CTA ================= */}

                <section className="resources-cta">

                    <div className="resources-cta-icon">
                        ♡
                    </div>

                    <div className="resources-cta-content">

                        <h2>
                            Ready to keep learning?
                        </h2>

                        <p>
                            Take the next step in your safe motherhood
                            learning journey.
                        </p>

                    </div>

                    <Link
                        to="/modules"
                        className="cta-button"
                    >
                        Explore Modules →
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