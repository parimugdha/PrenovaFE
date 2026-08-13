import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../utils/api";
import logo from "../assets/logo.jpeg";

const Signup = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: "",
        whatsapp: "",
        password: "",
        role: "user"
    });

    const formValidation = () => {
        let newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!form.whatsapp.trim()) {
            newErrors.whatsapp = "WhatsApp number is required";
        } else if (!/^[6-9]\d{9}$/.test(form.whatsapp)) {
            newErrors.whatsapp =
                "Enter a valid 10-digit number";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password =
                "Password must contain at least 6 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formValidation()) return;

        try {

            const response = await API.post(
                "/auth/signup",
                form
            );

            if (response.status === 200) {

                Swal.fire({
                    icon: "success",
                    title: "Account Created",
                    text: "Welcome to Prenova!",
                    timer: 2000,
                    showConfirmButton: false
                });

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }

        } catch (err) {

            console.error(err);

            Swal.fire({
                icon: "error",
                title: "Signup Failed",
                text:
                    err.response?.data?.message ||
                    "Unable to create your account. Please try again."
            });
        }
    };


    return (
        <div className="prenova-auth-page">

            {/* =================================================
                LEFT VISUAL
            ================================================= */}

            <div className="prenova-auth-visual">

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
                            alt="Prenova Logo"
                        />

                    </div>


                    <h1>
                        Begin your
                        <span>journey</span>
                    </h1>


                    <p>
                        Learn, prepare and feel confident
                        throughout your motherhood journey.
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

            </div>


            {/* =================================================
                SIGNUP CONTENT
            ================================================= */}

            <div className="prenova-auth-content">

                <div className="prenova-login-card">

                    {/* =================================================
                        MOBILE BRAND
                    ================================================= */}

                    <div className="mobile-auth-brand">

                        <div className="mobile-logo">

                            <img
                                src={logo}
                                alt="Prenova Logo"
                            />

                        </div>

                        <h2>
                            Prenova
                        </h2>

                    </div>


                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <div className="auth-heading">

                        <span className="section-label">
                            GET STARTED
                        </span>

                        <h2>
                            Create your account
                        </h2>

                        <p>
                            Start your safe motherhood
                            learning journey with Prenova.
                        </p>

                    </div>


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form onSubmit={handleSubmit}>

                        {/* ================= NAME ================= */}

                        <div className="auth-form-group">

                            <label>
                                Full Name
                            </label>


                            <div className="auth-input-wrapper">

                                <span className="input-icon">
                                    👤
                                </span>


                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    className={
                                        errors.name
                                            ? "auth-input input-error"
                                            : "auth-input"
                                    }
                                    onChange={(e) => {

                                        const value =
                                            e.target.value;

                                        setForm((prev) => ({
                                            ...prev,
                                            name: value
                                        }));

                                        let error = "";

                                        if (!value.trim()) {
                                            error =
                                                "Name is required";
                                        }

                                        setErrors((prev) => ({
                                            ...prev,
                                            name: error
                                        }));

                                    }}
                                />

                            </div>


                            {errors.name && (

                                <span className="auth-field-error">
                                    {errors.name}
                                </span>

                            )}

                        </div>


                        {/* ================= WHATSAPP ================= */}

                        <div className="auth-form-group">

                            <label>
                                WhatsApp Number
                            </label>


                            <div className="auth-input-wrapper">

                                <span className="input-icon">
                                    📱
                                </span>


                                <input
                                    type="tel"
                                    placeholder="Enter your 10-digit number"
                                    value={form.whatsapp}
                                    className={
                                        errors.whatsapp
                                            ? "auth-input input-error"
                                            : "auth-input"
                                    }
                                    onChange={(e) => {

                                        const value =
                                            e.target.value;

                                        setForm((prev) => ({
                                            ...prev,
                                            whatsapp: value
                                        }));

                                        let error = "";

                                        if (!value.trim()) {

                                            error =
                                                "WhatsApp number is required";

                                        } else if (
                                            !/^[6-9]\d{9}$/.test(value)
                                        ) {

                                            error =
                                                "Enter a valid 10-digit number";

                                        }

                                        setErrors((prev) => ({
                                            ...prev,
                                            whatsapp: error
                                        }));

                                    }}
                                />

                            </div>


                            {errors.whatsapp && (

                                <span className="auth-field-error">
                                    {errors.whatsapp}
                                </span>

                            )}

                        </div>


                        {/* ================= PASSWORD ================= */}

                        <div className="auth-form-group">

                            <label>
                                Password
                            </label>


                            <div className="auth-input-wrapper">

                                <span className="input-icon">
                                    🔒
                                </span>


                                <input
                                    type="password"
                                    placeholder="Minimum 6 characters"
                                    value={form.password}
                                    className={
                                        errors.password
                                            ? "auth-input input-error"
                                            : "auth-input"
                                    }
                                    onChange={(e) => {

                                        const value =
                                            e.target.value;

                                        setForm((prev) => ({
                                            ...prev,
                                            password: value
                                        }));

                                        let error = "";

                                        if (!value) {

                                            error =
                                                "Password is required";

                                        } else if (
                                            value.length < 6
                                        ) {

                                            error =
                                                "Password must contain at least 6 characters";

                                        }

                                        setErrors((prev) => ({
                                            ...prev,
                                            password: error
                                        }));

                                    }}
                                />

                            </div>


                            {errors.password && (

                                <span className="auth-field-error">
                                    {errors.password}
                                </span>

                            )}

                        </div>


                        {/* =================================================
                            TERMS / PRIVACY NOTE
                        ================================================= */}

                        <div className="signup-info">

                            <span>
                                ♡
                            </span>

                            <p>
                                By creating an account, you can
                                track your learning progress and
                                continue your journey anytime.
                            </p>

                        </div>


                        {/* =================================================
                            SUBMIT
                        ================================================= */}

                        <button
                            type="submit"
                            className="auth-submit-button"
                        >

                            <span>
                                Create Account
                            </span>

                            <span>
                                →
                            </span>

                        </button>

                    </form>


                    {/* =================================================
                        LOGIN LINK
                    ================================================= */}

                    <div className="auth-divider">

                        <span>
                            Already have an account?
                        </span>

                    </div>


                    <Link
                        to="/login"
                        className="auth-create-account"
                    >

                        Sign in to Prenova

                        <span>
                            →
                        </span>

                    </Link>


                    {/* =================================================
                        SAFE NOTE
                    ================================================= */}

                    <div className="auth-safe-note">

                        <span>
                            ♡
                        </span>

                        <p>
                            Your information is private
                            and secure.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="auth-footer">

                    © {new Date().getFullYear()} Prenova ·
                    Safe Motherhood Education Platform

                </div>

            </div>

        </div>
    );
};

export default Signup;