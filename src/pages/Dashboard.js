import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import '../../src/App.css';

export default function Dashboard() {

    const [modules, setModules] = useState([]);
    const [progress, setProgress] = useState({ modules: [] });

    useEffect(() => {
        // 🔷 Fetch modules
        API.get("/modules")
            .then((res) => {
                setModules(res.data);
            })
            .catch((err) => console.log(err));

        // 🔷 Fetch progress
        API.get("/progress")
            .then((res) => {
                setProgress(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // 🔷 Calculate Progress
    const total = modules.length;

    const completed =
        progress.modules?.filter((m) => m.status === "completed").length || 0;

    const percentage =
        total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="container mt-4">

            {/* 🔷 Header */}
            <div className="card shadow-sm mb-4">
                <div className="card-body text-center py-4">

                    <h3 className="fw-bold mb-1">Prenova Dashboard</h3>

                    <p className="text-muted mb-3">
                        Your Safe Motherhood Learning Journey
                    </p>

                    <Link
                        to="/modules"
                        className="btn btn-primary px-4"
                    >
                        📘 Explore Modules
                    </Link>

                </div>
            </div>

            {/* 🔷 Progress Section */}
            <div className="card p-3 shadow-sm mb-4">
                <h5>Your Progress</h5>

                <div className="progress mb-2">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percentage}%` }}
                    >
                        {percentage}%
                    </div>
                </div>

                <small className="text-muted">
                    {completed} of {total} modules completed
                </small>
            </div>

            {/* 🔷 Modules Section */}
            <div className="row">
                {modules.map((module) => {

                    const moduleData = progress.modules?.find(
                        (m) => m.moduleId?.toString() === module._id
                    );

                    // 🔷 Button Logic
                    let buttonText = "Start Module";
                    let buttonClass = "btn-blue";

                    if (moduleData?.status === "in_progress") {
                        buttonText = "Resume";
                        buttonClass = "btn-purple";
                    }

                    if (moduleData?.status === "completed") {
                        buttonText = "Review";
                        buttonClass = "btn-pink";
                    }

                    return (
                        <div className="col-md-6 mb-3" key={module._id}>
                            <div className="card p-3 shadow-sm h-100 d-flex flex-column justify-content-between">

                                <div>
                                    <h5 className="mb-2">{module.title}</h5>

                                    {/* 🔷 Status Badge */}
                                    <div className="mb-2">
                                        {!moduleData && (
                                            <span className="badge bg-secondary">
                                                Not Started
                                            </span>
                                        )}

                                        {moduleData?.status === "in_progress" && (
                                            <span className="badge bg-warning text-dark">
                                                In Progress ⏳
                                            </span>
                                        )}

                                        {moduleData?.status === "completed" && (
                                            <span className="badge bg-success">
                                                Completed ✔
                                            </span>
                                        )}
                                    </div>

                                    {/* 🔷 Score */}
                                    {moduleData?.status === "completed" && (
                                        <small className="text-muted">
                                            Score: {moduleData.score}
                                        </small>
                                    )}
                                </div>

                                {/* 🔷 Action Button */}
                                <Link
                                    to={`/module/${module._id}`}
                                    className={`btn ${buttonClass} btn-sm mt-3`}
                                >
                                    {buttonText}
                                </Link>

                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}