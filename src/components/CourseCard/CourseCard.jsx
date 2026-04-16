import React from 'react';
import styles from './CourseCard.module.css';
import { motion } from 'framer-motion';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

function CourseCard({ course }) {
    return (
        <motion.div
            className={styles.courseCard}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            <h3 className={styles.courseName}>{course.name}</h3>
            <div className={styles.metaBlock}>
                <h4 className={styles.institution}><SchoolRoundedIcon fontSize="small" /> {course.institution}</h4>
                <p className={styles.date}><CalendarMonthRoundedIcon fontSize="small" /> {course.date}</p>
            </div>
            <p className={styles.description}>{course.description}</p>

        </motion.div>
    );
}

export default CourseCard;