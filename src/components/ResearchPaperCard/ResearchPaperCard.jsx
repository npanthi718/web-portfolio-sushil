import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function ResearchPaperCard({ paper, styles }) {
    const [showStatus, setShowStatus] = useState(false);

    return (
        <motion.div
            className={styles.PaperItem}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.22 }}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            <h3 className={styles.PaperTitle}>{paper.title}</h3>
            <h4 className={styles.OrganizerName}><ApartmentRoundedIcon fontSize="small" /> {paper.organizer}</h4>
            <h5 className={styles.PaperInstitution}><SchoolRoundedIcon fontSize="small" /> {paper.institution}</h5>
            <p className={styles.dateLocation}>
                <span className={styles.metaBadge}><CalendarMonthRoundedIcon fontSize="small" /> {paper.date}</span>
                <span className={styles.metaBadge}><LocationOnRoundedIcon fontSize="small" /> {paper.location}</span>
            </p>
            <ul className={styles.descriptionList}>
                {paper.description.map((desc, descIndex) => (
                    <li key={descIndex} className={styles.descriptionItem}>{desc}</li>
                ))}
            </ul>
            <div className={styles.paperActions}>
                {paper.paperLink ? (
                    <a href={paper.paperLink} target="_blank" rel="noopener noreferrer" className={styles.paperLinkButton}>
                        <LaunchRoundedIcon fontSize="small" />
                        <span>View Live Paper</span>
                    </a>
                ) : (
                    <>
                        <button type="button" className={styles.paperLinkButton} onClick={() => setShowStatus((prev) => !prev)}>
                            <InfoOutlinedIcon fontSize="small" />
                            <span>View Live Paper</span>
                        </button>
                        <AnimatePresence>
                            {showStatus && (
                                <motion.div
                                    className={styles.paperStatusMessage}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <InfoOutlinedIcon fontSize="small" />
                                    <span>The paper has been presented but not published yet. It is currently in press and will be published soon.</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </motion.div>
    );
}

export default ResearchPaperCard;