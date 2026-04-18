import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../utils/api";


export default function AdminDashboard() {
    const navigate = useNavigate();

    const [editingId, setEditingId] = useState(null);
    const [modules, setModules] = useState([]);
    const [form, setForm] = useState({
        title: "",
        content: {
            en: "",
            hi: "",
            ta: ""
        },
        video: ""
    });

    // 🔷 Fetch modules
    const loadModules = () => {
        API.get("/modules")
            .then(res => setModules(res.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        loadModules();
    }, []);

    // 🔷 Create Module
    const handleSubmit = (e) => {
        e.preventDefault();

        const apiCall = editingId
            ? API.put(`/admin/module/${editingId}`, form)
            : API.post("/admin/module", form);

        apiCall
            .then(() => {
                // alert(editingId ? "Module updated" : "Module added");
                Swal.fire({
                    icon: "success",
                    title: editingId ? "Module updated" : "Module added",
                    text: "Succesfully Updated",
                    timer: 2000,
                    showConfirmButton: false
                });

                setForm({
                    title: "",
                    content: { en: "", hi: "", ta: "" },
                    video: ""
                });

                setEditingId(null);
                loadModules();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (module) => {
        setEditingId(module._id);

        setForm({
            title: module.title,
            content: {
                en: module.content?.en || "",
                hi: module.content?.hi || "",
                ta: module.content?.ta || ""
            },
            video: module.video || ""
        });
    };

    // 🔷 Delete Module
    const handleDelete = (id) => {
        API.delete(`/admin/module/${id}`)
            .then(() => loadModules())
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4">

            <h3 className="mb-4">Admin Panel</h3>

            {/* 🔷 Add Module */}
            <div className="card p-3 mb-4">
                <h5>Add New Module</h5>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        className="form-control mb-2"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Content (English)</label>
                        <textarea
                            className="form-control mb-2"
                            value={form.content.en}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    content: {
                                        ...form.content,
                                        en: e.target.value
                                    }
                                })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Content (Hindi)</label>
                        <textarea
                            className="form-control mb-2"
                            value={form.content.hi}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    content: {
                                        ...form.content,
                                        hi: e.target.value
                                    }
                                })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Content (Tamil)</label>
                        <textarea
                            className="form-control mb-2"
                            value={form.content.ta}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    content: {
                                        ...form.content,
                                        ta: e.target.value
                                    }
                                })
                            }
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="YouTube URL"
                        className="form-control mb-2"
                        value={form.video}
                        onChange={(e) =>
                            setForm({ ...form, video: e.target.value })
                        }
                    />

                    <button className="btn btn-purple">
                        {editingId ? "Update Module" : "Add Module"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => {
                                setEditingId(null);
                                setForm({
                                    title: "",
                                    content: { en: "", hi: "", ta: "" },
                                    video: ""
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {/* 🔷 Module List */}
            <div className="row">
                {modules.map((m) => (
                    <div className="col-md-6 mb-3" key={m._id}>
                        <div className="card p-3">

                            <h5>{m.title}</h5>
                            <p className="text-muted small">{m.content?.en}</p>

                            <button
                                className="btn btn-purple btn-sm m-2"
                                onClick={() => navigate(`/admin/quiz/${m._id}`)}
                            >
                                Manage Quiz
                            </button>

                            <button
                                className="btn btn-primary btn-sm m-2"
                                onClick={() => handleEdit(m)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm m-2"
                                onClick={() => handleDelete(m._id)}
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}