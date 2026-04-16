import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Navbar.module.css';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import { useTheme } from '../../../contexts/ThemeContext';

const resumeCandidates = import.meta.glob('../../../assets/*.{pdf,doc,docx}', {
    eager: true,
    import: 'default',
});

const navItems = [
    { href: '#home', label: 'Home', icon: HomeRoundedIcon },
    { href: '#about', label: 'About', icon: PersonRoundedIcon },
    { href: '#skills', label: 'Skills', icon: AutoAwesomeRoundedIcon },
    { href: '#projects', label: 'Projects', icon: WorkRoundedIcon },
    { href: '#experience', label: 'Experience', icon: BusinessCenterRoundedIcon },
    { href: '#additional-experience', label: 'Additional Experience', icon: BusinessCenterRoundedIcon },
    { href: '#education', label: 'Education', icon: SchoolRoundedIcon },
    { href: '#courses', label: 'Courses', icon: MenuBookRoundedIcon },
    { href: '#achievements', label: 'Achievements', icon: WorkspacePremiumRoundedIcon },
    { href: '#Papers', label: 'Research Papers', icon: ScienceRoundedIcon },
    { href: '#contact', label: 'Contact', icon: AlternateEmailRoundedIcon },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollY = useRef(0);
    const { theme, toggleTheme } = useTheme();

    const resolvedResume = useMemo(() => {
        const entries = Object.entries(resumeCandidates);
        const preferred = entries.find(([path]) => /resume/i.test(path));
        return preferred ? preferred[1] : entries[0]?.[1] || '#';
    }, []);

    const resumeExtension = useMemo(() => {
        const match = resolvedResume.match(/\.(pdf|doc|docx)(\?|$)/i);
        return match?.[1]?.toLowerCase() || 'pdf';
    }, [resolvedResume]);

    const resumeDownloadName = `Sushil_Panthi_Resume.${resumeExtension}`;

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

        const handleResize = () => {
            if (window.innerWidth > 980) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <nav className={`${styles.navbar} ${!showNavbar ? styles.navbarHidden : ''}`}>
                <a href="#home" className={styles.logo}>
                    <span className={styles.logoDot} />
                    Sushil Panthi
                </a>

                <ul className={styles.navLinks}>
                    {navItems.map(({ href, label, icon: Icon }) => (
                        <li key={href}>
                            <a href={href} className={styles.navLink}>
                                <Icon fontSize="small" />
                                <span>{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className={styles.navActions}>
                    <a href={resolvedResume} download={resumeDownloadName} className={styles.resumeButton}>
                        <DownloadRoundedIcon fontSize="small" />
                        <span>Resume</span>
                    </a>
                    <button
                        className={styles.themeButton}
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        aria-pressed={theme === 'light'}
                    >
                        {theme === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
                        <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                    </button>
                    <button className={styles.burgerButton} onClick={toggleMenu} aria-label="Open menu">
                        <MenuRoundedIcon fontSize="small" />
                        <span>Menu</span>
                    </button>
                </div>
            </nav>

            <div
                className={`${styles.sidebarOverlay} ${isMenuOpen ? styles.sidebarOverlayVisible : ''}`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            <aside className={`${styles.sidebarMenu} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarHeader}>
                    <span className={styles.sidebarTitle}>Navigate</span>
                    <button className={styles.sidebarClose} onClick={closeMenu} aria-label="Close menu">
                        <CloseRoundedIcon />
                        <span>Close</span>
                    </button>
                </div>
                <ul className={styles.sidebarLinks}>
                    {navItems.map(({ href, label, icon: Icon }) => (
                        <li key={href}>
                            <a href={href} className={styles.navLink} onClick={closeMenu}>
                                <Icon fontSize="small" />
                                <span>{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className={styles.sidebarActions}>
                    <a href={resolvedResume} download={resumeDownloadName} className={styles.resumeButton} onClick={closeMenu}>
                        <DownloadRoundedIcon fontSize="small" />
                        <span>Resume</span>
                    </a>
                    <button
                        className={styles.themeButton}
                        onClick={() => {
                            toggleTheme();
                            closeMenu();
                        }}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        aria-pressed={theme === 'light'}
                    >
                        {theme === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
                        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Navbar;
