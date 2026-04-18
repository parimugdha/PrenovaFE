import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from '../utils/api'
import logo from '../assets/logo.jpeg'


const Signup = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        whatsapp: "",
        password: "",
        role: "study"
    });

    const formValidation = () => {
        let newErrors = {};

        if (!form.name) {
            newErrors.name = "Name is required";
        }

        if (!form.whatsapp) {
            newErrors.whatsapp = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(form.whatsapp)) {
            newErrors.whatsapp = "Enter valid 10-digit number";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Minimum 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formValidation()) return;

        try {
            console.log(form);
            const response = await API.post("/auth/signup", form);
            if (response.status === 200) {
                navigate("/login");
            }
            alert("Signup successful");
        } catch (err) {
            console.error(err);
            alert("Error");
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card p-4 shadow w-100" style={{ maxWidth: "420px" }}>

                <div className="text-center mb-3">
                    <img
                        src={logo}
                        alt="Prenova Logo"
                        style={{ width: "70px", height: "70px", objectFit: "contain", borderRadius:'5rem' }}
                        className="mb-2"
                    />
                    <h2 className="fw-bold">Prenova</h2>
                    <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                        Safe Motherhood Education Platform
                    </p>
                </div>

                {/* 🔷 Form Title */}
                <h4 className="text-center mb-4">Create Account</h4>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>

                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            value={form.name}
                            onChange={(e) => {
                                const value = e.target.value;

                                setForm((prev) => ({ ...prev, name: value }));

                                let error = "";
                                if (!value.trim()) {
                                    error = "Name is required";
                                }

                                setErrors((prev) => ({ ...prev, name: error }));
                            }}
                        />

                        {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                        )}
                    </div>

                    {/* WhatsApp */}
                    <div className="mb-3">
                        <label className="form-label">WhatsApp Number</label>

                        <input
                            type="tel"
                            placeholder="10-digit number"
                            className={`form-control ${errors.whatsapp ? "is-invalid" : ""}`}
                            value={form.whatsapp}
                            onChange={(e) => {
                                const value = e.target.value;

                                setForm((prev) => ({ ...prev, whatsapp: value }));

                                let error = "";
                                if (!value.trim()) {
                                    error = "WhatsApp number is required";
                                } else if (!/^[6-9]\d{9}$/.test(value)) {
                                    error = "Enter valid 10-digit number";
                                }

                                setErrors((prev) => ({ ...prev, whatsapp: error }));
                            }}
                        />

                        {errors.whatsapp && (
                            <div className="invalid-feedback">{errors.whatsapp}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>

                        <input
                            type="password"
                            placeholder="Minimum 6 characters"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            value={form.password}
                            onChange={(e) => {
                                const value = e.target.value;

                                setForm((prev) => ({ ...prev, password: value }));

                                let error = "";
                                if (!value) {
                                    error = "Password is required";
                                } else if (value.length < 6) {
                                    error = "Minimum 6 characters";
                                }

                                setErrors((prev) => ({ ...prev, password: error }));
                            }}
                        />

                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                        <label className="form-label">User Type</label>

                        <select
                            className="form-select"
                            value={form.role}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, role: e.target.value }))
                            }
                        >
                            <option value="study">Study Participant</option>
                            <option value="guest">General User</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-100">
                        Create Account
                    </button>

                    {/* Login Link */}
                    <p className="text-center mt-3 mb-0">
                        Already have an account?{" "}
                        <Link to="/login" className="text-decoration-none">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Signup;