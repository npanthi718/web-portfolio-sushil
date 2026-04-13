import React from 'react';
import styles from './Footer.module.css';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
    return (
        <motion.footer
            className={styles.footer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            <p>&copy; {new Date().getFullYear()} Sushil Panthi. All Rights Reserved.</p>
            <div className={styles.socialLinks}>
                <a href="https://www.linkedin.com/in/sushilpanthi/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <LinkedInIcon fontSize="small" />
                    LinkedIn
                </a>
                <a href="https://github.com/npanthi718" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <GitHubIcon fontSize="small" />
                    GitHub
                </a>
            </div>
        </motion.footer>
    );
}

export default Footer;