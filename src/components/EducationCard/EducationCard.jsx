import React from 'react';
import styles from './EducationCard.module.css';
import { motion } from 'framer-motion';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';

function EducationCard({ education }) {
    return (
        <motion.div
            className={styles.educationCard}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            <h3 className={styles.degree}>{education.degree}</h3>
            <div className={styles.metaBlock}>
                <h4 className={styles.institution}><SchoolRoundedIcon fontSize="small" /> {education.institution}</h4>
                <div className={styles.metaRow}>
                    <p className={styles.date}><CalendarMonthRoundedIcon fontSize="small" /> {education.dates}</p>
                    {education.cgpa && <p className={styles.cgpa}><WorkspacePremiumRoundedIcon fontSize="small" /> CGPA: {education.cgpa}</p>}
                </div>
            </div>
        </motion.div>
    );
}

export default EducationCard;