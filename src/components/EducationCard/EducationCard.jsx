import React from 'react';
import styles from './EducationCard.module.css';
import { motion } from 'framer-motion';

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
            <h4 className={styles.institution}>{education.institution}</h4>
            <p className={styles.date}>{education.dates}</p>
            {education.cgpa && <p className={styles.cgpa}>CGPA: {education.cgpa}</p>}
        </motion.div>
    );
}

export default EducationCard;