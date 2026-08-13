import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/user/Navbar";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is Prenova?",
            answer:
                "Prenova is a safe motherhood education platform designed to help mothers and families learn about pregnancy, childbirth, newborn care and other important aspects of motherhood."
        },
        {
            question: "Who is Prenova designed for?",
            answer:
                "Prenova is designed primarily for mothers and expecting mothers, while also providing useful educational information for families and caregivers who support them."
        },
        {
            question: "What can I learn through Prenova?",
            answer:
                "Prenova provides learning modules covering pregnancy and antenatal care, nutrition and lifestyle, danger signs, labour and birth, postnatal and newborn care, mental wellbeing, myths and facts, and family involvement."
        },
        {
            question: "Is Prenova available in different languages?",
            answer:
                "Yes. Prenova currently supports English, Hindi and Tamil so that users can learn in a language they are comfortable with."
        },
        {
            question: "How do I start learning?",
            answer:
                "After creating an account and logging in, visit the Modules section. Choose any module you want to learn and select Start Module."
        },
        {
            question: "Can I track my learning progress?",
            answer:
                "Yes. Prenova tracks your module progress. You can see modules that are not started, in progress or completed from your learning dashboard."
        },
        {
            question: "What happens after completing a module?",
            answer:
                "Modules may include a short knowledge check. After completing the quiz, your score is recorded and the module is marked as completed."
        },
        {
            question: "Can I review a completed module?",
            answer:
                "Yes. Completed modules remain available so that you can revisit the learning content whenever you want."
        },
        {
            question: "Is the information on Prenova medical advice?",
            answer:
                "No. Prenova is an educational platform. Its content is intended to improve awareness and understanding and should not replace advice, diagnosis or treatment from a qualified healthcare professional."
        },
        {
            question: "What should I do if I have a pregnancy-related emergency?",
            answer:
                "If you experience concerning symptoms or believe you may be facing an emergency, seek immediate assistance from a qualified healthcare professional or the nearest appropriate healthcare facility. Do not rely on Prenova as a substitute for emergency medical care."
        },
        {
            question: "Is my learning progress saved?",
            answer:
                "Yes. When you are logged in, your module progress and completed quiz scores are associated with your account."
        },
        {
            question: "What if I forget my password?",
            answer:
                "If you forget your password, please contact the Prenova administrator for assistance with resetting your account."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="prenova-app">

            {/* ================= NAVBAR ================= */}

            <Navbar />


            {/* ================= MAIN ================= */}

            <main className="faq-page">

                {/* ================= HERO ================= */}

                <section className="faq-hero">

                    <div className="faq-hero-content">

                        <div className="welcome-pill">
                            <span>♡</span>
                            Frequently Asked Questions
                        </div>

                        <h1>
                            Questions?
                            <span> We’re here to help.</span>
                        </h1>

                        <p>
                            Find answers to common questions about
                            Prenova, your learning journey and the
                            information available on the platform.
                        </p>

                    </div>

                    <div className="faq-hero-visual">

                        <div className="faq-main-circle">
                            ?
                        </div>

                        <div className="faq-floating-heart heart-one">
                            ♡
                        </div>

                        <div className="faq-floating-heart heart-two">
                            ♡
                        </div>

                    </div>

                </section>


                {/* ================= FAQ CONTENT ================= */}

                <section className="faq-content-section">

                    <div className="faq-content-header">

                        <span className="section-label">
                            HELP & INFORMATION
                        </span>

                        <h2>
                            Frequently Asked Questions
                        </h2>

                        <p>
                            Everything you need to know about using
                            Prenova and your safe motherhood learning journey.
                        </p>

                    </div>


                    <div className="faq-list">

                        {faqs.map((faq, index) => {

                            const isOpen = openIndex === index;

                            return (
                                <div
                                    className={`faq-item ${
                                        isOpen ? "open" : ""
                                    }`}
                                    key={index}
                                >

                                    <button
                                        className="faq-question"
                                        onClick={() =>
                                            toggleFAQ(index)
                                        }
                                        aria-expanded={isOpen}
                                    >

                                        <span className="faq-question-number">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="faq-question-text">
                                            {faq.question}
                                        </span>

                                        <span className="faq-toggle">
                                            {isOpen ? "−" : "+"}
                                        </span>

                                    </button>


                                    {isOpen && (
                                        <div className="faq-answer">

                                            <p>
                                                {faq.answer}
                                            </p>

                                        </div>
                                    )}

                                </div>
                            );
                        })}

                    </div>

                </section>


                {/* ================= IMPORTANT NOTE ================= */}

                <section className="faq-note">

                    <div className="faq-note-icon">
                        ℹ
                    </div>

                    <div>

                        <h3>
                            Important health information
                        </h3>

                        <p>
                            Prenova provides educational information
                            about pregnancy and motherhood. It does not
                            replace professional medical advice, diagnosis
                            or treatment. If you have concerns about your
                            health or your baby's health, please consult
                            a qualified healthcare professional.
                        </p>

                    </div>

                </section>


                {/* ================= CTA ================= */}

                <section className="faq-cta">

                    <div className="faq-cta-icon">
                        ♡
                    </div>

                    <div className="faq-cta-content">

                        <h2>
                            Still have questions?
                        </h2>

                        <p>
                            Continue exploring Prenova and build your
                            knowledge one step at a time.
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