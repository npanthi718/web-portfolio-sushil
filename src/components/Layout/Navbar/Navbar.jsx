import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import DownloadResume from "../../../assets/Resume.pdf";
import { FiDownload } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollY = useRef(0);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${!showNavbar ? styles.navbarHidden : ""}`}>
            <div className={styles.logo}>Sushil Panthi</div>
            <button className={styles.burgerButton} onClick={toggleMenu}>
                <FaBars size={24} />
            </button>
            <ul className={styles.navLinks}>
                <li><a href="#home" className={styles.navLink}>Home</a></li>
                <li><a href="#about" className={styles.navLink}>About</a></li>
                <li><a href="#skills" className={styles.navLink}>Skills</a></li>
                <li><a href="#projects" className={styles.navLink}>Projects</a></li>
                <li><a href="#experience" className={styles.navLink}>Experience</a></li>
                <li><a href="#additional-experience" className={styles.navLink}>Additional Experience</a></li>
                <li><a href="#education" className={styles.navLink}>Education</a></li>
                <li><a href="#courses" className={styles.navLink}>Courses</a></li>
                <li><a href="#achievements" className={styles.navLink}>Achievements</a></li>
                <li><a href="#Papers" className={styles.navLink}>Research Papers</a></li>
                <li><a href="#contact" className={styles.navLink}>Contact</a></li>
            </ul>
            <div className={styles.navActions}>
                <a
                    href={DownloadResume}
                    download="Sushil_Panthi_Resume.pdf"
                    className={styles.resumeButton}
                >
                    <FiDownload size={20} />
                    <span className={styles.buttonText}>Resume</span>
                </a>
            </div>

            {/* Sidebar for hamburger menu on mobile */}
            {isMenuOpen && (
                <div className={styles.sidebarOverlay} onClick={closeMenu} />
            )}
            <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.sidebarOpen : ""}`}>
                <button className={styles.sidebarClose} onClick={closeMenu}>
                    <FaTimes size={28} />
                </button>
                <ul className={styles.sidebarLinks}>
                    <li><a href="#home" className={styles.navLink} onClick={closeMenu}>Home</a></li>
                    <li><a href="#about" className={styles.navLink} onClick={closeMenu}>About</a></li>
                    <li><a href="#skills" className={styles.navLink} onClick={closeMenu}>Skills</a></li>
                    <li><a href="#projects" className={styles.navLink} onClick={closeMenu}>Projects</a></li>
                    <li><a href="#experience" className={styles.navLink} onClick={closeMenu}>Experience</a></li>
                    <li><a href="#additional-experience" className={styles.navLink} onClick={closeMenu}>Additional Experience</a></li>
                    <li><a href="#education" className={styles.navLink} onClick={closeMenu}>Education</a></li>
                    <li><a href="#courses" className={styles.navLink} onClick={closeMenu}>Courses</a></li>
                    <li><a href="#achievements" className={styles.navLink} onClick={closeMenu}>Achievements</a></li>
                    <li><a href="#Papers" className={styles.navLink} onClick={closeMenu}>Research Papers</a></li>
                    <li><a href="#contact" className={styles.navLink} onClick={closeMenu}>Contact</a></li>
                </ul>
                <div className={styles.sidebarActions}>
                    <a
                        href={DownloadResume}
                        download="Sushil_Panthi_Resume.pdf"
                        className={styles.resumeButton}
                        onClick={closeMenu}
                    >
                        <FiDownload size={20} />
                        <span className={styles.buttonText}>Resume</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
