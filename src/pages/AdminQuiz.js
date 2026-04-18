import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import API from "../utils/api";

export default function AdminQuiz() {
    const { moduleId } = useParams();

    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState("");
    const [quizzes, setQuizzes] = useState([]);

    const [form, setForm] = useState({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0
    });

    useEffect(() => {
        if (moduleId) {
            setSelectedModule(moduleId);
        }
    }, [moduleId]);

    // 🔷 Load modules
    useEffect(() => {
        API.get("/modules")
            .then(res => setModules(res.data))
            .catch(err => console.log(err));
    }, []);

    // 🔷 Load quizzes when module selected
    useEffect(() => {
        if (!selectedModule) return;

        API.get(`/admin/quiz/${selectedModule}`)
            .then(res => setQuizzes(res.data))
            .catch(err => console.log(err));

    }, [selectedModule]);

    // 🔷 Handle option change
    const handleOptionChange = (index, value) => {
        const newOptions = [...form.options];
        newOptions[index] = value;
        setForm({ ...form, options: newOptions });
    };

    // 🔷 Submit quiz
    const handleSubmit = (e) => {
        e.preventDefault();

        API.post("/admin/quiz", {
            moduleId: selectedModule,
            ...form
        })
            .then(() => {
                alert("Question added");
                setForm({
                    question: "",
                    options: ["", "", "", ""],
                    correctAnswer: 0
                });

                // reload
                return API.get(`/admin/quiz/${selectedModule}`);
            })
            .then(res => setQuizzes(res.data))
            .catch(err => console.log(err));
    };

    // 🔷 Delete
    const handleDelete = (id) => {
        API.delete(`/admin/quiz/${id}`)
            .then(() =>
                setQuizzes(prev => prev.filter(q => q._id !== id))
            )
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4">

            <h3 className="mb-4">Quiz Management</h3>

            {/* 🔷 Select Module */}
            <select
                className="form-select mb-3"
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
            >
                <option value="">Select Module</option>
                {modules.map(m => (
                    <option key={m._id} value={m._id}>
                        {m.title}
                    </option>
                ))}
            </select>

            {/* 🔷 Add Question */}
            {selectedModule && (
                <div className="card p-3 mb-4">
                    <h5>Add Question</h5>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Question"
                            className="form-control mb-2"
                            value={form.question}
                            onChange={(e) =>
                                setForm({ ...form, question: e.target.value })
                            }
                        />

                        {form.options.map((opt, i) => (
                            <input
                                key={i}
                                type="text"
                                placeholder={`Option ${i + 1}`}
                                className="form-control mb-2"
                                value={opt}
                                onChange={(e) =>
                                    handleOptionChange(i, e.target.value)
                                }
                            />
                        ))}

                        <select
                            className="form-select mb-2"
                            value={form.correctAnswer}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    correctAnswer: Number(e.target.value)
                                })
                            }
                        >
                            <option value={0}>Correct: Option 1</option>
                            <option value={1}>Correct: Option 2</option>
                            <option value={2}>Correct: Option 3</option>
                            <option value={3}>Correct: Option 4</option>
                        </select>

                        <button className="btn btn-purple">
                            Add Question
                        </button>
                    </form>
                </div>
            )}

            {/* 🔷 Quiz List */}
            <div>
                {quizzes.map(q => (
                    <div className="card p-3 mb-2" key={q._id}>
                        <strong>{q.question}</strong>

                        <ul>
                            {q.options.map((opt, i) => (
                                <li key={i}>
                                    {opt}
                                    {i === q.correctAnswer && " ✔"}
                                </li>
                            ))}
                        </ul>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(q._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}