import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import logo from "../assets/logo.jpeg";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        whatsapp: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);

            // store token
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert("Login successful");

            // 🔷 Role-based navigation
            if (res.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }


        } catch (err) {
            console.error(err);
            setErrors({
                general: "Invalid WhatsApp number or password"
            });
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5" >
            <div className="card p-4 shadow w-100" style={{ maxWidth: "420px" }}>

                {/* 🔷 Branding */}
                <div className="text-center mb-3">
                    <img
                        src={logo}
                        alt="Prenova Logo"
                        style={{ width: "70px", height: "70px", objectFit: "contain", borderRadius: '5rem' }}
                        className="mb-2"
                    />

                    <h2 className="fw-bold mb-0">Prenova</h2>

                    <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                        Safe Motherhood Education Platform
                    </p>
                </div>

                {/* 🔷 Form Title */}
                <h4 className="text-center mb-4">Login</h4>

                <form onSubmit={handleSubmit}>

                    {/* General Error */}
                    {errors.general && (
                        <div className="alert alert-danger py-2">
                            {errors.general}
                        </div>
                    )}

                    {/* WhatsApp */}
                    <div className="mb-3">
                        <label className="form-label">WhatsApp Number</label>

                        <input
                            type="tel"
                            placeholder="Enter your number"
                            className={`form-control ${errors.whatsapp ? "is-invalid" : ""
                                }`}
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
                            <div className="invalid-feedback">
                                {errors.whatsapp}
                            </div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            className={`form-control ${errors.password ? "is-invalid" : ""
                                }`}
                            value={form.password}
                            onChange={(e) => {
                                const value = e.target.value;

                                setForm((prev) => ({ ...prev, password: value }));

                                let error = "";
                                if (!value) {
                                    error = "Password is required";
                                }

                                setErrors((prev) => ({ ...prev, password: error }));
                            }}
                        />

                        {errors.password && (
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>

                    {/* Signup Link */}
                    <p className="text-center mt-3 mb-0">
                        Don’t have an account?{" "}
                        <Link to="/" className="text-decoration-none">
                            Create Account
                        </Link>
                    </p>

                </form>
            </div>
        </div >
    );
}

export default Login