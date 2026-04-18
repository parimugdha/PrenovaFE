import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

export default function Modules() {

  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState({ modules: [] });

  useEffect(() => {
    // 🔷 Fetch modules
    API.get('/modules')
      .then(res => setModules(res.data))
      .catch(err => console.log(err));

    // 🔷 Fetch progress
    API.get('/progress')
      .then(res => setProgress(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">

      {/* 🔷 Header */}
      <div className="text-center mb-4">
        <h3 className="fw-bold">Prenova Modules</h3>
        <p className="text-muted">
          Learn step-by-step for a safe pregnancy
        </p>
      </div>

      {/* 🔷 Modules Grid */}
      <div className="row">
        {modules.map((module) => {

          // 🔷 Find progress for this module
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
                  {/* 🔷 Title */}
                  <h5 className="mb-2">{module.title}</h5>

                  {/* 🔷 Description */}
                  <p className="text-muted small">
                    {module.description}
                  </p>

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

                {/* 🔷 Button */}
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