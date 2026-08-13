import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="prenova-navbar">

            <div className="prenova-navbar-inner">

                {/* ================================
                    BRAND
                ================================= */}

                <Link
                    to="/dashboard"
                    className="prenova-brand"
                    onClick={closeMenu}
                >

                    <div className="prenova-logo">
                        ♡
                    </div>

                    <div className="prenova-brand-text">

                        <div className="prenova-brand-name">
                            Prenova
                        </div>

                        <div className="prenova-brand-tagline">
                            Your Safe Motherhood Journey
                        </div>

                    </div>

                </Link>


                {/* ================================
                    DESKTOP NAVIGATION
                ================================= */}

                <div className="prenova-nav-links">

                    <Link
                        to="/dashboard"
                        className={`prenova-nav-link ${isActive("/dashboard")
                                ? "active"
                                : ""
                            }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/modules"
                        className={`prenova-nav-link ${isActive("/modules")
                                ? "active"
                                : ""
                            }`}
                    >
                        Modules
                    </Link>

                    <Link
                        to="/about"
                        className={`prenova-nav-link ${isActive("/about")
                                ? "active"
                                : ""
                            }`}
                    >
                        About Us
                    </Link>

                    <Link
                        to="/resources"
                        className={`prenova-nav-link ${isActive("/resources")
                                ? "active"
                                : ""
                            }`}
                    >
                        Resources
                    </Link>

                    <Link
                        to="/faq"
                        className={`prenova-nav-link ${isActive("/faq")
                                ? "active"
                                : ""
                            }`}
                    >
                        FAQ
                    </Link>

                </div>


                {/* ================================
                    RIGHT SIDE
                ================================= */}

                <div className="prenova-nav-right">

                    {/* Language */}

                    <button
                        className="language-button"
                        type="button"
                    >
                        <span>🌐</span>
                        <span className="language-text">
                            English
                        </span>
                        <span>⌄</span>
                    </button>


                    {/* Profile */}

                    <Link
                        to="/profile"
                        className="profile-button"
                    >
                        <span>👤</span>
                        <span className="profile-text">
                            Profile
                        </span>
                    </Link>


                    {/* Mobile Menu */}

                    <button
                        type="button"
                        className="mobile-menu-button"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>

                </div>

            </div>


            {/* ================================
                MOBILE MENU
            ================================= */}

            <div
                className={`mobile-nav ${menuOpen ? "open" : ""
                    }`}
            >

                <Link
                    to="/dashboard"
                    className={
                        isActive("/dashboard")
                            ? "active"
                            : ""
                    }
                    onClick={closeMenu}
                >
                    <span>⌂</span>
                    Home
                </Link>

                <Link
                    to="/modules"
                    className={
                        isActive("/modules")
                            ? "active"
                            : ""
                    }
                    onClick={closeMenu}
                >
                    <span>♡</span>
                    Modules
                </Link>

                <Link
                    to="/about"
                    className={
                        isActive("/about")
                            ? "active"
                            : ""
                    }
                    onClick={closeMenu}
                >
                    <span>◉</span>
                    About Us
                </Link>

                <Link
                    to="/resources"
                    className={
                        isActive("/resources")
                            ? "active"
                            : ""
                    }
                    onClick={closeMenu}
                >
                    <span>▱</span>
                    Resources
                </Link>

                <Link
                    to="/faq"
                    className={
                        isActive("/faq")
                            ? "active"
                            : ""
                    }
                    onClick={closeMenu}
                >
                    <span>?</span>
                    FAQ
                </Link>


                <div className="mobile-nav-divider" />


                <Link
                    to="/profile"
                    className="mobile-profile-link"
                    onClick={closeMenu}
                >
                    <span>👤</span>
                    Profile
                </Link>

            </div>

        </nav>
    );
}