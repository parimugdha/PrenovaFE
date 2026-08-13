import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../utils/api";
import logo from "../assets/logo.jpeg";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        whatsapp: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!form.whatsapp.trim()) {
            newErrors.whatsapp = "WhatsApp number is required";
        } else if (!/^[6-9]\d{9}$/.test(form.whatsapp)) {
            newErrors.whatsapp = "Enter a valid 10-digit number";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear field error while typing
        if (errors[name] || errors.general) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
                general: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const res = await API.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            await Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome back to Prenova!",
                timer: 1600,
                showConfirmButton: false,
            });

            if (res.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            console.error(err);

            setErrors({
                general: "Invalid WhatsApp number or password",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        Swal.fire({
            icon: "info",
            title: "Forgot Password?",
            text: "Please contact the Prenova administrator to reset your password.",
            confirmButtonColor: "#9d4f8f",
        });
    };

    return (
        <div className="prenova-auth-page">

            {/* =================================================
                LEFT VISUAL
            ================================================= */}

            <section className="prenova-auth-visual">

                <div className="auth-decoration decoration-one">
                    ♡
                </div>

                <div className="auth-decoration decoration-two">
                    ♡
                </div>

                <div className="auth-visual-content">

                    <div className="auth-logo-circle">
                        <img
                            src={logo}
                            alt="Prenova"
                        />
                    </div>

                    <h1>
                        Welcome to
                        <span>Prenova</span>
                    </h1>

                    <p>
                        Your Safe Motherhood Learning Journey
                    </p>

                    <div className="auth-mother-illustration">
                        🤰
                    </div>

                    <div className="auth-quote">
                        <span>♡</span>
                        <p>
                            Learn. Prepare. Care. Thrive.
                        </p>
                    </div>

                </div>

            </section>


            {/* =================================================
                LOGIN CONTENT
            ================================================= */}

            <main className="prenova-auth-content">

                <div className="prenova-login-card">

                    {/* Mobile Logo */}

                    <div className="mobile-auth-brand">

                        <div className="mobile-logo">
                            <img
                                src={logo}
                                alt="Prenova"
                            />
                        </div>

                        <h2>Prenova</h2>

                    </div>


                    {/* Heading */}

                    <div className="auth-heading">

                        <span className="section-label">
                            WELCOME BACK
                        </span>

                        <h2>
                            Continue your journey
                        </h2>

                        <p>
                            Sign in to continue learning
                            about safe motherhood.
                        </p>

                    </div>


                    {/* General Error */}

                    {errors.general && (
                        <div className="auth-error">
                            <span>!</span>
                            <p>{errors.general}</p>
                        </div>
                    )}


                    {/* Form */}

                    <form onSubmit={handleSubmit}>

                        {/* WhatsApp */}

                        <div className="auth-form-group">

                            <label htmlFor="whatsapp">
                                WhatsApp Number
                            </label>

                            <div className="auth-input-wrapper">

                                <span className="input-icon">
                                    📱
                                </span>

                                <input
                                    id="whatsapp"
                                    name="whatsapp"
                                    type="tel"
                                    inputMode="numeric"
                                    autoComplete="tel"
                                    maxLength="10"
                                    placeholder="Enter your 10-digit number"
                                    value={form.whatsapp}
                                    className={
                                        errors.whatsapp
                                            ? "auth-input input-error"
                                            : "auth-input"
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                            {errors.whatsapp && (
                                <span className="auth-field-error">
                                    {errors.whatsapp}
                                </span>
                            )}

                        </div>


                        {/* Password */}

                        <div className="auth-form-group">

                            <div className="password-label-row">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="forgot-password"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot password?
                                </button>

                            </div>

                            <div className="auth-input-wrapper">

                                <span className="input-icon">
                                    🔒
                                </span>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    className={
                                        errors.password
                                            ? "auth-input input-error"
                                            : "auth-input"
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                            {errors.password && (
                                <span className="auth-field-error">
                                    {errors.password}
                                </span>
                            )}

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            className="auth-submit-button"
                            disabled={loading}
                        >
                            <span>
                                {loading
                                    ? "Signing in..."
                                    : "Sign In"}
                            </span>

                            <span>
                                {loading ? "..." : "→"}
                            </span>
                        </button>

                    </form>


                    {/* Create Account */}

                    <div className="auth-divider">
                        <span>New to Prenova?</span>
                    </div>

                    <Link
                        to="/"
                        className="auth-create-account"
                    >
                        Create your account
                        <span>→</span>
                    </Link>


                    {/* Security Note */}

                    <div className="auth-safe-note">

                        <span>♡</span>

                        <p>
                            Your learning journey is private
                            and secure.
                        </p>

                    </div>

                </div>


                {/* Footer */}

                <div className="auth-footer">
                    © {new Date().getFullYear()} Prenova ·
                    Safe Motherhood Education Platform
                </div>

            </main>

        </div>
    );
};

export default Login;