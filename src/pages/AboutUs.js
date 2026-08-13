import { Link } from "react-router-dom";

import Navbar from "../components/user/Navbar";
import SectionHeading from "../components/user/SectionHeading";

export default function AboutUs() {

    return (
        <div className="prenova-app">

            {/* ==========================================
                NAVBAR
            ========================================== */}

            <Navbar />


            {/* ==========================================
                MAIN
            ========================================== */}

            <main className="about-page">


                {/* ==========================================
                    HERO
                ========================================== */}

                <section className="about-hero">

                    <div className="about-hero-content">

                        <div className="welcome-pill">

                            <span>♡</span>

                            About Prenova

                        </div>


                        <h1>

                            Knowledge for a

                            <span>
                                safer motherhood
                            </span>

                        </h1>


                        <p>

                            Prenova is a safe, simple and
                            accessible learning platform designed
                            to help mothers and families understand
                            pregnancy, childbirth and newborn care.

                        </p>


                        <div className="about-hero-actions">

                            <Link
                                to="/modules"
                                className="primary-button"
                            >

                                Explore Learning

                                <span>
                                    →
                                </span>

                            </Link>

                        </div>

                    </div>


                    {/* Illustration */}

                    <div className="about-hero-visual">

                        <div className="about-main-circle">

                            🤰

                        </div>


                        <div className="about-floating-card card-one">

                            <span>
                                ♡
                            </span>

                            Safe Learning

                        </div>


                        <div className="about-floating-card card-two">

                            <span>
                                ✓
                            </span>

                            Trusted Knowledge

                        </div>


                        <div className="about-baby-circle">

                            👶

                        </div>

                    </div>

                </section>


                {/* ==========================================
                    INTRODUCTION
                ========================================== */}

                <section className="about-intro">

                    <div className="about-intro-card">

                        <div className="about-intro-icon">
                            ♡
                        </div>


                        <SectionHeading
                            label="OUR PURPOSE"
                            title="Every mother deserves access to the right knowledge."
                            description="Pregnancy is a journey filled with questions, emotions and important decisions. Prenova aims to make reliable health education easier to understand and easier to access."
                        />

                    </div>

                </section>


                {/* ==========================================
                    WHAT IS PRENOVA
                ========================================== */}

                <section className="about-content-section">

                    <div className="about-content-grid">

                        <div className="about-content-text">

                            <SectionHeading
                                label="ABOUT PRENOVA"
                                title="Your Safe Motherhood Learning Journey"
                                description="Prenova brings essential maternal and newborn health education into one simple learning experience."
                            />


                            <p className="about-paragraph">

                                Our platform provides structured educational
                                modules covering important stages of
                                pregnancy and motherhood.

                            </p>


                            <p className="about-paragraph">

                                Instead of overwhelming users with complex
                                medical information, Prenova presents
                                important concepts in a clear and
                                understandable format.

                            </p>


                            <p className="about-paragraph">

                                Through learning content, videos,
                                multilingual support and knowledge checks,
                                users can gradually build confidence and
                                awareness throughout their motherhood journey.

                            </p>

                        </div>


                        <div className="about-values-card">

                            <div className="about-value">

                                <div className="about-value-icon">
                                    📚
                                </div>

                                <div>

                                    <h3>
                                        Simple Learning
                                    </h3>

                                    <p>
                                        Important information explained
                                        in an easy-to-understand way.
                                    </p>

                                </div>

                            </div>


                            <div className="about-value">

                                <div className="about-value-icon">
                                    🌐
                                </div>

                                <div>

                                    <h3>
                                        Multilingual
                                    </h3>

                                    <p>
                                        Learn in English, Hindi or Tamil
                                        based on your comfort.
                                    </p>

                                </div>

                            </div>


                            <div className="about-value">

                                <div className="about-value-icon">
                                    ❤️
                                </div>

                                <div>

                                    <h3>
                                        Mother-Centered
                                    </h3>

                                    <p>
                                        Designed around the needs of
                                        mothers and families.
                                    </p>

                                </div>

                            </div>


                            <div className="about-value">

                                <div className="about-value-icon">
                                    ✓
                                </div>

                                <div>

                                    <h3>
                                        Learn & Check
                                    </h3>

                                    <p>
                                        Knowledge checks help reinforce
                                        what you have learned.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ==========================================
                    OUR LEARNING APPROACH
                ========================================== */}

                <section className="about-approach-section">

                    <SectionHeading
                        label="OUR APPROACH"
                        title="Learn one step at a time."
                        description="Prenova turns a complex motherhood journey into simple learning steps."
                    />


                    <div className="about-steps">

                        <div className="about-step">

                            <div className="about-step-number">
                                01
                            </div>

                            <div className="about-step-icon">
                                📖
                            </div>

                            <h3>
                                Learn
                            </h3>

                            <p>
                                Explore carefully structured learning
                                modules covering important topics.
                            </p>

                        </div>


                        <div className="about-step">

                            <div className="about-step-number">
                                02
                            </div>

                            <div className="about-step-icon">
                                💡
                            </div>

                            <h3>
                                Understand
                            </h3>

                            <p>
                                Read, watch and explore information at
                                your own pace.
                            </p>

                        </div>


                        <div className="about-step">

                            <div className="about-step-number">
                                03
                            </div>

                            <div className="about-step-icon">
                                📝
                            </div>

                            <h3>
                                Check
                            </h3>

                            <p>
                                Test your understanding with quick
                                knowledge checks.
                            </p>

                        </div>


                        <div className="about-step">

                            <div className="about-step-number">
                                04
                            </div>

                            <div className="about-step-icon">
                                🌸
                            </div>

                            <h3>
                                Feel Confident
                            </h3>

                            <p>
                                Build knowledge and confidence for
                                your motherhood journey.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ==========================================
                    MODULE AREAS
                ========================================== */}

                <section className="about-modules-section">

                    <div className="about-modules-header">

                        <SectionHeading
                            label="WHAT YOU CAN LEARN"
                            title="Knowledge for every stage."
                            description="Prenova brings together important areas of maternal and newborn health education."
                        />

                    </div>


                    <div className="about-topic-grid">

                        <div className="about-topic-card">

                            <span>
                                🤰
                            </span>

                            <h3>
                                Pregnancy & Antenatal Care
                            </h3>

                            <p>
                                Understand pregnancy changes,
                                antenatal care and healthy practices.
                            </p>

                        </div>


                        <div className="about-topic-card">

                            <span>
                                🥗
                            </span>

                            <h3>
                                Nutrition & Lifestyle
                            </h3>

                            <p>
                                Learn about healthy nutrition and
                                lifestyle during pregnancy.
                            </p>

                        </div>


                        <div className="about-topic-card">

                            <span>
                                ⚠️
                            </span>

                            <h3>
                                Danger Signs
                            </h3>

                            <p>
                                Recognize important warning signs
                                that should not be ignored.
                            </p>

                        </div>


                        <div className="about-topic-card">

                            <span>
                                👶
                            </span>

                            <h3>
                                Labour & Birth
                            </h3>

                            <p>
                                Learn about labour, delivery and
                                preparing for birth.
                            </p>

                        </div>


                        <div className="about-topic-card">

                            <span>
                                🍼
                            </span>

                            <h3>
                                Postnatal & Newborn Care
                            </h3>

                            <p>
                                Learn essential information about
                                mothers and newborns after birth.
                            </p>

                        </div>


                        <div className="about-topic-card">

                            <span>
                                🧠
                            </span>

                            <h3>
                                Mental Wellbeing
                            </h3>

                            <p>
                                Understand the importance of
                                emotional wellbeing during motherhood.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ==========================================
                    IMPORTANT NOTE
                ========================================== */}

                <section className="about-note">

                    <div className="about-note-icon">
                        ℹ
                    </div>


                    <div>

                        <h3>
                            Prenova is an educational platform
                        </h3>

                        <p>

                            The information provided through Prenova
                            is intended for educational purposes and
                            should not replace advice, diagnosis or
                            treatment from a qualified healthcare
                            professional.

                        </p>

                    </div>

                </section>


                {/* ==========================================
                    CTA
                ========================================== */}

                <section className="about-cta">

                    <div className="about-cta-icon">
                        ♡
                    </div>


                    <div className="about-cta-content">

                        <h2>
                            Start your learning journey today.
                        </h2>

                        <p>
                            Learn. Prepare. Care. Thrive.
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