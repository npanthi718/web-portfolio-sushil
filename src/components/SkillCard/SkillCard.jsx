import React from 'react';
import styles from './SkillCard.module.css';
import { motion } from 'framer-motion';
import { getSkillIcon } from '../../data/iconRegistry';


function SkillCard({ skill }) {
    const IconComponent = getSkillIcon(skill.name);

    return (
        <motion.div
            className={styles.skillCard}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
        >
            <div className={styles.iconContainer}>
                <IconComponent className={styles.skillIcon} aria-hidden="true" />
            </div>
            <h3 className={styles.skillName}>{skill.name}</h3>
            {skill.proficiency && (
                <div className={styles.proficiencyBar}>
                    <motion.div
                        className={styles.proficiencyLevel}
                        style={{ width: `${skill.proficiency}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                </div>
            )}
        </motion.div>
    );
}

export default SkillCard;