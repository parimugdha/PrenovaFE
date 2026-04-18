import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";

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

    // 🔷 Fetch module
    useEffect(() => {
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

    // 🔷 Fetch quiz
    useEffect(() => {
        API.get(`/quiz/${id}`)
            .then((res) => setQuiz(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    // 🔷 Save in_progress
    useEffect(() => {
        if (!module || progressSaved) return;

        API.post("/progress/save", {
            moduleId: module._id,
            status: "in_progress"
        })
            .then(() => setProgressSaved(true))
            .catch((err) => console.log(err));

    }, [module, progressSaved]);

    // 🔷 Check if already completed
    useEffect(() => {
        API.get("/progress")
            .then((res) => {
                const found = res.data.modules.find(
                    (m) =>
                        m.moduleId?.toString() === id &&
                        m.status === "completed"
                );

                if (found) {
                    setAlreadyCompleted(true);
                    setSubmitted(true);
                    setScore(found.score);
                }
            })
            .catch((err) => console.log(err));
    }, [id]);

    // 🔷 Handle Answer
    const handleAnswer = (qId, optionIndex) => {
        setAnswers((prev) => ({
            ...prev,
            [qId]: optionIndex
        }));
    };

    // 🔷 Submit Quiz
    const handleSubmit = async () => {
        let correct = 0;

        quiz.forEach((q) => {
            if (answers[q._id] === q.correctAnswer) {
                correct++;
            }
        });

        setScore(correct);
        setSubmitted(true);

        try {
            await API.post("/progress/save", {
                moduleId: id,
                score: correct,
                status: "completed"
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (!module) return <p className="text-center mt-5">Module not found</p>;

    return (
        <div className="container mt-4">

            {/* 🔷 Title */}
            <h3 className="mb-3">{module.title}</h3>

            {/* 🎥 Video */}
            <div className="mb-4">
                <iframe
                    width="100%"
                    height="250"
                    src={module.video}
                    title="Video"
                    allowFullScreen
                ></iframe>
            </div>

            {/* 🌐 Language Toggle */}
            <div className="d-flex justify-content-end mb-3">
                {["en", "hi", "ta"].map((l) => (
                    <button
                        key={l}
                        className={`btn btn-sm me-2 ${lang === l ? "btn-purple" : "btn-outline-secondary"
                            }`}
                        onClick={() => setLang(l)}
                    >
                        {l === "en" ? "English" : l === "hi" ? "हिंदी" : "தமிழ்"}
                    </button>
                ))}
            </div>

            {/* 📄 Content */}
            <div className="card p-3 mb-4">
                <h5>Learning Content</h5>
                <p>{module.content?.[lang] || module.content?.en}</p>
            </div>

            {/* ❓ Quiz */}
            {quiz.length > 0 && (
                <div className="card p-3 mb-4">
                    <h5>Quiz</h5>

                    {quiz.map((q, index) => (
                        <div key={q._id} className="mb-3">
                            <p className="fw-semibold">
                                {index + 1}. {q.question}
                            </p>

                            {q.options.map((opt, i) => (
                                <div key={i} className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name={q._id}
                                        checked={answers[q._id] === i}
                                        onChange={() => handleAnswer(q._id, i)}
                                        disabled={submitted}
                                    />
                                    <label className="form-check-label">
                                        {opt}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Submit */}
                    {!submitted && !alreadyCompleted && (
                        <button
                            className="btn btn-purple"
                            onClick={handleSubmit}
                        >
                            Submit Quiz
                        </button>
                    )}

                    {/* Score */}
                    {submitted && (
                        <div className="alert alert-success mt-3">
                            Your Score: {score} / {quiz.length}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}