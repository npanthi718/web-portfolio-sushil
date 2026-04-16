import React from 'react';
import { motion } from 'framer-motion';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

function ExperienceCard({ item, styles }) {
    return (
        <motion.div
            className={styles.experienceItem}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.22 }}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            <h3 className={styles.jobTitle}>{item.title}</h3>
            <h4 className={styles.companyName}><ApartmentRoundedIcon fontSize="small" /> {item.company}</h4>
            <p className={styles.dateLocation}>
                <span className={styles.metaBadge}><CalendarMonthRoundedIcon fontSize="small" /> {item.date}</span>
                {item.location && <span className={styles.metaBadge}><LocationOnRoundedIcon fontSize="small" /> {item.location}</span>}
            </p>
            <ul className={styles.descriptionList}>
                {item.description.map((desc, descIndex) => (
                    <li key={descIndex} className={styles.descriptionItem}>{desc}</li>
                ))}
            </ul>
        </motion.div>
    );
}

export default ExperienceCard;