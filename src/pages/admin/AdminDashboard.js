import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../utils/api";

const emptyForm = {
    title: "",
    content: {
        en: "",
        hi: "",
        ta: ""
    },
    video: ""
};

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [editingId, setEditingId] = useState(null);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState(emptyForm);

    // ==========================================
    // FETCH MODULES
    // ==========================================

    const loadModules = async () => {
        try {
            const res = await API.get("/modules");
            setModules(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadModules();
    }, []);


    // ==========================================
    // FORM HANDLERS
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleContentChange = (language, value) => {
        setForm((prev) => ({
            ...prev,
            content: {
                ...prev.content,
                [language]: value
            }
        }));
    };


    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };


    // ==========================================
    // CREATE / UPDATE MODULE
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Title required",
                text: "Please enter a module title."
            });
            return;
        }

        try {
            setLoading(true);

            if (editingId) {
                await API.put(
                    `/admin/module/${editingId}`,
                    form
                );
            } else {
                await API.post(
                    "/admin/module",
                    form
                );
            }

            Swal.fire({
                icon: "success",
                title: editingId
                    ? "Module Updated"
                    : "Module Created",
                text: editingId
                    ? "The module has been updated successfully."
                    : "The new module has been created successfully.",
                timer: 1800,
                showConfirmButton: false
            });

            resetForm();
            await loadModules();

        } catch (err) {
            console.error(err);

            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: "Unable to save the module."
            });

        } finally {
            setLoading(false);
        }
    };


    // ==========================================
    // EDIT MODULE
    // ==========================================

    const handleEdit = (module) => {
        setEditingId(module._id);

        setForm({
            title: module.title || "",
            content: {
                en: module.content?.en || "",
                hi: module.content?.hi || "",
                ta: module.content?.ta || ""
            },
            video: module.video || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // ==========================================
    // DELETE MODULE
    // ==========================================

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Delete module?",
            text: "This action cannot be undone.",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d9468f"
        });

        if (!result.isConfirmed) return;

        try {
            await API.delete(`/admin/module/${id}`);

            Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Module deleted successfully.",
                timer: 1500,
                showConfirmButton: false
            });

            loadModules();

        } catch (err) {
            console.error(err);

            Swal.fire({
                icon: "error",
                title: "Delete failed",
                text: "Unable to delete the module."
            });
        }
    };


    return (
        <div className="admin-dashboard">


            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="admin-page-header">

                <div>
                    <span className="admin-section-label">
                        CONTENT MANAGEMENT
                    </span>

                    <h1>
                        Module Management
                    </h1>

                    <p>
                        Create, edit and manage Prenova learning modules.
                    </p>
                </div>

                <div className="admin-module-count">
                    <span>{modules.length}</span>
                    <small>
                        {modules.length === 1
                            ? "Module"
                            : "Modules"}
                    </small>
                </div>

            </div>


            {/* ==========================================
                MODULE FORM
            ========================================== */}

            <section className="admin-form-card">

                <div className="admin-card-header">

                    <div className="admin-card-icon">
                        {editingId ? "✎" : "+"}
                    </div>

                    <div>
                        <span className="admin-section-label">
                            {editingId
                                ? "EDIT MODULE"
                                : "CREATE MODULE"}
                        </span>

                        <h2>
                            {editingId
                                ? "Update Learning Module"
                                : "Add New Module"}
                        </h2>
                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* Module title */}

                    <div className="admin-form-group">

                        <label>
                            Module Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter module title"
                            value={form.title}
                            onChange={handleChange}
                        />

                    </div>


                    {/* English */}

                    <div className="admin-form-group">

                        <label>
                            English Content
                            <span>English</span>
                        </label>

                        <textarea
                            placeholder="Enter English learning content..."
                            value={form.content.en}
                            onChange={(e) =>
                                handleContentChange(
                                    "en",
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Hindi */}

                    <div className="admin-form-group">

                        <label>
                            Hindi Content
                            <span>हिंदी</span>
                        </label>

                        <textarea
                            placeholder="हिंदी learning content दर्ज करें..."
                            value={form.content.hi}
                            onChange={(e) =>
                                handleContentChange(
                                    "hi",
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Tamil */}

                    <div className="admin-form-group">

                        <label>
                            Tamil Content
                            <span>தமிழ்</span>
                        </label>

                        <textarea
                            placeholder="தமிழ் learning content உள்ளிடவும்..."
                            value={form.content.ta}
                            onChange={(e) =>
                                handleContentChange(
                                    "ta",
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Video */}

                    <div className="admin-form-group">

                        <label>
                            Video URL
                            <span>Optional</span>
                        </label>

                        <div className="admin-video-input">

                            <span>
                                ▶
                            </span>

                            <input
                                type="url"
                                name="video"
                                placeholder="https://www.youtube.com/..."
                                value={form.video}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="admin-form-actions">

                        <button
                            type="submit"
                            className="admin-primary-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : editingId
                                    ? "Update Module →"
                                    : "Create Module →"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="admin-secondary-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </section>


            {/* ==========================================
                MODULE LIST
            ========================================== */}

            <section className="admin-modules-section">

                <div className="admin-list-header">

                    <div>
                        <span className="admin-section-label">
                            EXISTING CONTENT
                        </span>

                        <h2>
                            Learning Modules
                        </h2>
                    </div>

                    <span className="admin-list-count">
                        {modules.length} total
                    </span>

                </div>


                {modules.length === 0 ? (

                    <div className="admin-empty-state">

                        <div>
                            📚
                        </div>

                        <h3>
                            No modules yet
                        </h3>

                        <p>
                            Create your first learning module
                            using the form above.
                        </p>

                    </div>

                ) : (

                    <div className="admin-module-grid">

                        {modules.map((module, index) => (

                            <article
                                className="admin-module-card"
                                key={module._id}
                            >

                                <div className="admin-module-card-top">

                                    <div className="admin-module-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <div className="admin-module-actions">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(module)
                                            }
                                            title="Edit module"
                                        >
                                            ✎
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(module._id)
                                            }
                                            title="Delete module"
                                        >
                                            ×
                                        </button>

                                    </div>

                                </div>


                                <div className="admin-module-card-content">

                                    <span className="admin-module-status">
                                        LEARNING MODULE
                                    </span>

                                    <h3>
                                        {module.title}
                                    </h3>

                                    <p>
                                        {module.content?.en
                                            ? module.content.en.substring(
                                                0,
                                                150
                                            ) +
                                            (module.content.en.length > 150
                                                ? "..."
                                                : "")
                                            : "No English content available."}
                                    </p>

                                </div>


                                <div className="admin-module-card-footer">

                                    <div className="admin-module-info">

                                        <span>
                                            🌐
                                        </span>

                                        3 Languages

                                    </div>

                                    {module.video && (
                                        <div className="admin-module-info">
                                            <span>
                                                ▶
                                            </span>
                                            Video
                                        </div>
                                    )}

                                </div>


                                <button
                                    type="button"
                                    className="admin-quiz-button"
                                    onClick={() =>
                                        navigate(
                                            `/admin/quiz/${module._id}`
                                        )
                                    }
                                >
                                    Manage Quiz
                                    <span>→</span>
                                </button>

                            </article>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}