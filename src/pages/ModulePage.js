import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";
import "../../src/App.css";
import SectionHeading from "../components/user/SectionHeading";

export default function ModulePage() {

    const { id } = useParams();

    const [module, setModule] = useState(null);
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState("en");
    const [progressSaved, setProgressSaved] = useState(false);
    const [alreadyCompleted, setAlreadyCompleted] = useState(false);


    // ================= FETCH MODULE =================

    useEffect(() => {

        setLoading(true);

        API.get(`/modules/${id}`)

            .then((res) => {

                setModule(res.data);

                setLoading(false);

            })

            .catch((err) => {

                console.log(err);

                setLoading(false);

            });

    }, [id]);


    // ================= FETCH QUIZ =================

    useEffect(() => {

        API.get(`/quiz/${id}`)

            .then((res) => {

                setQuiz(
                    Array.isArray(res.data)
                        ? res.data
                        : []
                );

            })

            .catch((err) =>
                console.log(err)
            );

    }, [id]);


    // ================= CHECK COMPLETION =================

    useEffect(() => {

        API.get("/progress")

            .then((res) => {

                const found =
                    res.data.modules?.find(
                        (m) =>
                            m.moduleId?.toString() ===
                            id &&
                            m.status ===
                            "completed"
                    );

                if (found) {

                    setAlreadyCompleted(
                        true
                    );

                    setSubmitted(
                        true
                    );

                    setScore(
                        found.score
                    );

                }

            })

            .catch((err) =>
                console.log(err)
            );

    }, [id]);


    // ================= SAVE IN PROGRESS =================

    useEffect(() => {

        if (
            !module ||
            progressSaved ||
            alreadyCompleted
        ) {
            return;
        }

        API.post(
            "/progress/save",
            {
                moduleId:
                    module._id,

                status:
                    "in_progress"
            }
        )

            .then(() =>
                setProgressSaved(true)
            )

            .catch((err) =>
                console.log(err)
            );

    }, [
        module,
        progressSaved,
        alreadyCompleted
    ]);


    // ================= HANDLE ANSWER =================

    const handleAnswer = (
        qId,
        optionIndex
    ) => {

        setAnswers((prev) => ({

            ...prev,

            [qId]:
                optionIndex

        }));

    };


    // ================= SUBMIT QUIZ =================

    const handleSubmit = async () => {

        if (quiz.length === 0) {
            return;
        }

        let correct = 0;

        quiz.forEach((q) => {

            if (
                answers[q._id] ===
                q.correctAnswer
            ) {

                correct++;

            }

        });

        setScore(correct);

        setSubmitted(true);

        try {

            await API.post(
                "/progress/save",
                {
                    moduleId: id,
                    score: correct,
                    status: "completed"
                }
            );

            setAlreadyCompleted(
                true
            );

        } catch (err) {

            console.log(err);

        }

    };


    // ================= LOADING =================

    if (loading) {

        return (

            <div className="module-loading">

                <div className="loading-heart">
                    ♡
                </div>

                <p>
                    Preparing your learning journey...
                </p>

            </div>

        );

    }


    // ================= NOT FOUND =================

    if (!module) {

        return (

            <div className="module-not-found">

                <div className="not-found-icon">
                    ♡
                </div>

                <h2>
                    Module not found
                </h2>

                <p>
                    We couldn't find the learning module you're
                    looking for.
                </p>

                <Link
                    to="/modules"
                    className="primary-button"
                >
                    ← Back to Modules
                </Link>

            </div>

        );

    }


    // ================= CONTENT =================

    const content =
        module.content?.[lang] ||
        module.content?.en ||
        "Learning content is not available.";


    // =================================================
    // MODULE IMAGES
    // =================================================
    // New format:
    // images: ["url1", "url2"]
    //
    // Old format:
    // image: ["url1", "url2"]
    //
    // Also supports:
    // image: "url"
    // =================================================

    let moduleImages = [];


    if (
        Array.isArray(module.images)
    ) {

        moduleImages =
            module.images.filter(
                Boolean
            );

    }

    else if (
        Array.isArray(module.image)
    ) {

        moduleImages =
            module.image.filter(
                Boolean
            );

    }

    else if (
        module.image
    ) {

        moduleImages = [
            module.image
        ];

    }


    // Remove duplicate / empty values

    moduleImages =
        [...new Set(moduleImages)]
            .filter(
                (image) =>
                    typeof image === "string" &&
                    image.trim() !== ""
            )
            .slice(0, 5);


    const percentage =
        quiz.length > 0
            ? Math.round(
                (score / quiz.length) *
                100
            )
            : 0;


    return (

        <div className="prenova-app">


            {/* =================================================
                NAVBAR
            ================================================= */}

            <nav className="prenova-navbar">

                <div className="prenova-navbar-inner">


                    {/* Brand */}

                    <Link
                        to="/dashboard"
                        className="prenova-brand"
                    >

                        <div className="prenova-logo">
                            ♡
                        </div>


                        <div>

                            <div className="prenova-brand-name">
                                Prenova
                            </div>

                            <div className="prenova-brand-tagline">
                                Your Safe Motherhood Journey
                            </div>

                        </div>

                    </Link>


                    {/* Navigation */}

                    <div className="prenova-nav-links">

                        <Link
                            to="/dashboard"
                            className="prenova-nav-link"
                        >
                            Home
                        </Link>

                        <Link
                            to="/modules"
                            className="prenova-nav-link active"
                        >
                            Modules
                        </Link>

                        <Link
                            to="/about"
                            className="prenova-nav-link"
                        >
                            About Us
                        </Link>

                        <Link
                            to="/resources"
                            className="prenova-nav-link"
                        >
                            Resources
                        </Link>

                        <Link
                            to="/faq"
                            className="prenova-nav-link"
                        >
                            FAQ
                        </Link>

                    </div>


                    {/* Right */}

                    <div className="prenova-nav-right">

                        <button className="language-button">
                            🌐 English
                            <span>⌄</span>
                        </button>

                        <button className="profile-button">
                            👤 Profile
                        </button>

                        <button className="mobile-menu-button">
                            ☰
                        </button>

                    </div>

                </div>

            </nav>


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="module-page">


                {/* ================= BACK ================= */}

                <Link
                    to="/modules"
                    className="module-back"
                >
                    ← Back to Modules
                </Link>


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="module-hero">

                    <div className="module-hero-content">

                        <div className="welcome-pill">

                            <span>
                                ♡
                            </span>

                            PRENOVA LEARNING MODULE

                        </div>


                        <h1>
                            {module.title}
                        </h1>


                        <p>

                            {module.description ||
                                "Learn important information and build confidence for a safer motherhood journey."
                            }

                        </p>


                        <div className="module-meta">

                            <span>
                                📖 Learning Module
                            </span>


                            {quiz.length > 0 && (

                                <span>
                                    📝 {quiz.length} Questions
                                </span>

                            )}


                            {alreadyCompleted && (

                                <span className="completed-pill">
                                    ✓ Completed
                                </span>

                            )}

                        </div>

                    </div>


                    <div className="module-hero-illustration">

                        <div className="module-hero-circle">
                            🤰
                        </div>

                        <div className="module-floating-heart">
                            ♡
                        </div>

                        <div className="module-baby-circle">
                            👶
                        </div>

                    </div>

                </section>


                {/* =================================================
                    VIDEO
                ================================================= */}

                {module.video && (

                    <section className="learning-video-section">

                        <SectionHeading

                            label="WATCH & LEARN"

                            title="Learn through video"

                            description="Watch the educational video before moving on to the learning content."

                        />


                        <div className="video-card">

                            <div className="video-wrapper">

                                <iframe

                                    src={
                                        module.video
                                    }

                                    title={
                                        module.title
                                    }

                                    allowFullScreen

                                    loading="lazy"

                                />

                            </div>

                        </div>

                    </section>

                )}


                {/* =================================================
                    LANGUAGE
                ================================================= */}

                <section className="language-section">

                    <div>

                        <span className="section-label">
                            CHOOSE YOUR LANGUAGE
                        </span>

                        <h3>
                            Learn in the language you're comfortable with
                        </h3>

                    </div>


                    <div className="language-tabs">

                        {[
                            "en",
                            "hi",
                            "ta"
                        ].map(
                            (language) => (

                                <button

                                    key={
                                        language
                                    }

                                    className={
                                        lang ===
                                            language
                                            ? "language-tab active"
                                            : "language-tab"
                                    }

                                    onClick={() =>
                                        setLang(
                                            language
                                        )
                                    }

                                >

                                    {language ===
                                        "en" &&
                                        "English"}

                                    {language ===
                                        "hi" &&
                                        "हिंदी"}

                                    {language ===
                                        "ta" &&
                                        "தமிழ்"}

                                </button>

                            )
                        )}

                    </div>

                </section>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <section className="learning-content-section">

                    <div className="learning-content-card">


                        <div className="learning-content-header">

                            <div className="content-icon">
                                📖
                            </div>


                            <div>

                                <span className="section-label">
                                    LEARNING CONTENT
                                </span>

                                <h2>
                                    Understanding{" "}
                                    {module.title}
                                </h2>

                            </div>

                        </div>


                        {/* =================================================
                            COMMON MODULE IMAGES
                        ================================================= */}

                        {moduleImages.length > 0 && (

                            <div className="module-images-container">

                                {moduleImages.map(
                                    (
                                        image,
                                        index
                                    ) => (

                                        <img

                                            key={
                                                `${image}-${index}`
                                            }

                                            src={
                                                image
                                            }

                                            alt={`${module.title} ${index + 1}`}

                                            className="module-small-image"

                                            onError={(e) => {

                                                console.error(
                                                    "MODULE IMAGE FAILED:",
                                                    image
                                                );

                                                e.currentTarget.style.display =
                                                    "none";

                                            }}

                                        />

                                    )
                                )}

                            </div>

                        )}


                        {/* =================================================
                            LANGUAGE CONTENT
                        ================================================= */}

                        <div

                            className="learning-content module-content"

                            dangerouslySetInnerHTML={{
                                __html:
                                    content
                            }}

                        />

                    </div>

                </section>


                {/* =================================================
                    QUIZ
                ================================================= */}

                {quiz.length > 0 && (

                    <section className="quiz-section">

                        <SectionHeading

                            label="TEST YOUR KNOWLEDGE"

                            title="Quick Knowledge Check"

                            description="Answer the questions below to complete this module."

                        />


                        <div className="quiz-card">

                            {quiz.map(
                                (
                                    q,
                                    index
                                ) => {

                                    const selected =
                                        answers[
                                            q._id
                                        ];


                                    return (

                                        <div

                                            key={
                                                q._id
                                            }

                                            className="quiz-question"

                                        >

                                            <div className="question-number">
                                                {index + 1}
                                            </div>


                                            <div className="question-content">

                                                <h3>
                                                    {q.question}
                                                </h3>


                                                <div className="quiz-options">

                                                    {q.options.map(
                                                        (
                                                            option,
                                                            optionIndex
                                                        ) => {

                                                            const isSelected =
                                                                selected ===
                                                                optionIndex;


                                                            const isCorrect =
                                                                submitted &&
                                                                optionIndex ===
                                                                q.correctAnswer;


                                                            const isWrong =
                                                                submitted &&
                                                                isSelected &&
                                                                !isCorrect;


                                                            let optionClass =
                                                                "quiz-option";


                                                            if (
                                                                isSelected
                                                            ) {

                                                                optionClass +=
                                                                    " selected";

                                                            }


                                                            if (
                                                                isCorrect
                                                            ) {

                                                                optionClass +=
                                                                    " correct";

                                                            }


                                                            if (
                                                                isWrong
                                                            ) {

                                                                optionClass +=
                                                                    " wrong";

                                                            }


                                                            return (

                                                                <label

                                                                    key={
                                                                        optionIndex
                                                                    }

                                                                    className={
                                                                        optionClass
                                                                    }

                                                                >

                                                                    <input

                                                                        type="radio"

                                                                        name={
                                                                            q._id
                                                                        }

                                                                        checked={
                                                                            selected ===
                                                                            optionIndex
                                                                        }

                                                                        onChange={() =>
                                                                            handleAnswer(
                                                                                q._id,
                                                                                optionIndex
                                                                            )
                                                                        }

                                                                        disabled={
                                                                            submitted
                                                                        }

                                                                    />


                                                                    <span className="custom-radio">

                                                                        {isCorrect
                                                                            ? "✓"
                                                                            : ""}

                                                                    </span>


                                                                    <span>
                                                                        {option}
                                                                    </span>

                                                                </label>

                                                            );

                                                        }
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    );

                                }
                            )}


                            {/* ================= SUBMIT ================= */}

                            {!submitted &&
                                !alreadyCompleted && (

                                    <div className="quiz-submit-area">

                                        <p>
                                            Make sure you have answered
                                            all questions before submitting.
                                        </p>


                                        <button

                                            className="quiz-submit-button"

                                            onClick={
                                                handleSubmit
                                            }

                                        >

                                            Complete Module

                                            <span>
                                                →
                                            </span>

                                        </button>

                                    </div>

                                )}


                            {/* ================= RESULT ================= */}

                            {submitted && (

                                <div

                                    className={`quiz-result ${percentage >= 60
                                            ? "success"
                                            : "needs-review"
                                        }`}

                                >

                                    <div className="result-icon">

                                        {percentage >=
                                            60
                                            ? "✓"
                                            : "↻"}

                                    </div>


                                    <div className="result-content">

                                        <span>

                                            {alreadyCompleted
                                                ? "MODULE COMPLETED"
                                                : "QUIZ COMPLETED"}

                                        </span>


                                        <h3>

                                            {percentage >=
                                                60
                                                ? "Well done! 🌸"
                                                : "Keep learning and try again."}

                                        </h3>


                                        <p>

                                            You scored{" "}

                                            <strong>
                                                {score}
                                            </strong>{" "}

                                            out of{" "}

                                            <strong>
                                                {quiz.length}
                                            </strong>{" "}

                                            questions.

                                        </p>

                                    </div>


                                    <div className="result-score">
                                        {percentage}%
                                    </div>

                                </div>

                            )}

                        </div>

                    </section>

                )}


                {/* =================================================
                    COMPLETE MESSAGE
                ================================================= */}

                {submitted && (

                    <section className="module-complete-banner">

                        <div className="complete-icon">
                            ♡
                        </div>


                        <div>

                            <h2>
                                Thank you for learning with Prenova.
                            </h2>

                            <p>
                                Every bit of knowledge brings you one
                                step closer to a safer and more confident
                                motherhood journey.
                            </p>

                        </div>


                        <Link
                            to="/dashboard"
                            className="complete-button"
                        >
                            Back to Dashboard →
                        </Link>

                    </section>

                )}

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