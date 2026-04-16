import React, { Suspense, lazy, useState } from 'react';
import styles from './Home.module.css';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { aboutData, additionalExperienceData, achievementsData, categorizedSkillsData, coursesData, educationData, experienceData, externalLinks, heroData, projectsData, researchpapersData } from '../../data/portfolioData';

const SkillCard = lazy(() => import('../../components/SkillCard/SkillCard'));
const ProjectCard = lazy(() => import('../../components/ProjectCard/ProjectCard'));
const CourseCard = lazy(() => import('../../components/CourseCard/CourseCard'));
const EducationCard = lazy(() => import('../../components/EducationCard/EducationCard'));
const ReactTyped = lazy(() => import('react-typed').then((module) => ({ default: module.ReactTyped })));

const photoCandidates = import.meta.glob('../../assets/photo.{avif,webp,jpg,jpeg,png}', {
    eager: true,
    import: 'default',
});

const pickPhotoByExt = (ext) => {
    const found = Object.entries(photoCandidates).find(([path]) => path.toLowerCase().endsWith(`.${ext}`));
    return found ? found[1] : null;
};

const profileImageAvif = pickPhotoByExt('avif');
const profileImageWebp = pickPhotoByExt('webp');
const profileImageFallback =
    pickPhotoByExt('jpg') ||
    pickPhotoByExt('jpeg') ||
    pickPhotoByExt('png') ||
    profileImageWebp ||
    profileImageAvif ||
    '';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || import.meta.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const EMAILJS_ADMIN_TEMPLATE_ID =
    import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID ||
    import.meta.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID ||
    'template_ff6ip5a';

function Home() {
    const contactIconMap = {
        email: EmailRoundedIcon,
        phone: CallRoundedIcon,
        linkedin: LinkedInIcon,
        github: GitHubIcon,
    };


    const [formData, setFormData] = useState({ // State for form data
        name: '',
        email: '',
        message: '',
    });
    const [feedback, setFeedback] = useState('');
    const [feedbackType, setFeedbackType] = useState('success');
    const [debugHint, setDebugHint] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({
        name: '',
        email: '',
        message: '',
    });

    const buildTemplateDebugHint = (confirmationFailed, adminFailed) => {
        const failedTemplates = [];

        if (confirmationFailed) {
            failedTemplates.push(`confirmation (${EMAILJS_TEMPLATE_ID})`);
        }

        if (adminFailed) {
            failedTemplates.push(`admin (${EMAILJS_ADMIN_TEMPLATE_ID})`);
        }

        return failedTemplates.length > 0
            ? `Debug: failed template(s): ${failedTemplates.join(', ')}`
            : '';
    };

    const handleChange = (e) => {  // Handle form input changes
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (fieldErrors[name]) {
            setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors = { name: '', email: '', message: '' };
        const name = formData.name.trim();
        const email = formData.email.trim();
        const message = formData.message.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length < 2) {
            errors.name = 'Name must be at least 2 characters.';
        }

        if (!emailPattern.test(email)) {
            errors.email = 'Enter a valid email address.';
        }

        if (message.length < 10) {
            errors.message = 'Message must be at least 10 characters.';
        }

        return errors;
    };

    const handleSubmit = async (e) => { // Handle form submission
        e.preventDefault();

        const errors = validateForm();
        const hasErrors = Object.values(errors).some((value) => Boolean(value));

        if (hasErrors) {
            setFieldErrors(errors);
            setFeedbackType('error');
            setDebugHint('');
            setFeedback('Please fix the highlighted fields and try again.');
            return;
        }

        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_ADMIN_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            setFeedbackType('error');
            setDebugHint('');
            setFeedback('Email service is not configured. Add VITE_EMAILJS_* (or REACT_APP_EMAILJS_*) values in your .env file.');
            return;
        }

        try {
            setIsSending(true);
            setDebugHint('');
            setFieldErrors({ name: '', email: '', message: '' });
            const templateParams = {
                from_name: formData.name.trim(),
                from_email: formData.email.trim(),
                email: formData.email.trim(),
                reply_to: formData.email.trim(),
                message: formData.message.trim(),
            };

            const [confirmationResult, adminResult] = await Promise.allSettled([
                emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams,
                    EMAILJS_PUBLIC_KEY
                ),
                emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_ADMIN_TEMPLATE_ID,
                    templateParams,
                    EMAILJS_PUBLIC_KEY
                ),
            ]);

            if (confirmationResult.status === 'rejected' || adminResult.status === 'rejected') {
                const confirmationFailed = confirmationResult.status === 'rejected';
                const adminFailed = adminResult.status === 'rejected';

                console.error('EmailJS partial failure:', {
                    confirmationError: confirmationFailed ? confirmationResult.reason : null,
                    adminError: adminFailed ? adminResult.reason : null,
                });

                setFeedbackType('error');
                setDebugHint(buildTemplateDebugHint(confirmationFailed, adminFailed));
                if (confirmationFailed && adminFailed) {
                    setFeedback('Failed to send both confirmation and admin notification. Please try again.');
                } else if (confirmationFailed) {
                    setFeedback('Your message reached admin, but confirmation email failed.');
                } else {
                    setFeedback('Confirmation email sent, but admin notification failed.');
                }
                return;
            }

            setFeedbackType('success');
            setDebugHint('');
            setFeedback("Message sent! You will receive a confirmation email, and admin has been notified.");
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('EmailJS send failed:', error);
            const status = error?.status ? ` (status ${error.status})` : '';
            const reason = error?.text || error?.message || 'Unknown error';
            const isAuthError = error?.status === 401 || error?.status === 403;

            setFeedbackType('error');
            setDebugHint('Debug: request failed before template status resolution. Check EmailJS response in console.');
            setFeedback(
                isAuthError
                    ? 'Failed to send: check EmailJS Public Key and allowed origins in EmailJS dashboard.'
                    : `Failed to send${status}: ${reason}`
            );
        } finally {
            setIsSending(false);
            setTimeout(() => {
                setFeedback('');
                setDebugHint('');
            }, 4000);
        }
    };


    return (
        <div className={styles.homeContainer}>
            <motion.section
                id="home"
                className={styles.home}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className={styles.intro}>
                    <motion.picture
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.6, type: 'spring', stiffness: 80 }}
                    >
                        {profileImageAvif && <source srcSet={profileImageAvif} type="image/avif" />}
                        {profileImageWebp && <source srcSet={profileImageWebp} type="image/webp" />}
                        <img
                            src={profileImageFallback}
                            alt="Sushil Panthi"
                            className={styles.profileImage}
                            width="3439"
                            height="4064"
                            loading="eager"
                            decoding="async"
                        />
                    </motion.picture>
                    <div className={styles.text}>
                        <motion.h1
                            className={styles.name}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.8, type: 'spring', stiffness: 100 }}
                        >
                            Hi, I'm{' '}
                            <Suspense fallback="Sushil Panthi">
                                <ReactTyped
                                    strings={['Sushil Panthi']}
                                    typeSpeed={100}
                                    backSpeed={50}
                                    startDelay={1000}
                                    backDelay={3500}
                                    loop={true}
                                    showCursor={false}
                                />
                            </Suspense>
                        </motion.h1>

                        {/* Typing effect for "Full Stack Developer (MERN)" and "Power BI Developer" */}
                        <motion.p
                            className={styles.tagline}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 1.0, type: 'spring', stiffness: 100 }}
                        >
                            <Suspense fallback="Full Stack Developer (MERN)">
                                <ReactTyped
                                    strings={heroData.roles}
                                    typeSpeed={100}
                                    backSpeed={50}
                                    startDelay={1000}
                                    backDelay={3500}
                                    loop={true}
                                    showCursor={false}
                                />
                            </Suspense>
                            {' '}| Open to Relocation
                        </motion.p>
                        <motion.p
                            className={styles.overview}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 1.2 }}
                        >
                            {heroData.overview}
                        </motion.p>
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="about"
                className={styles.about}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className={styles.titleWithIcon}><PersonRoundedIcon /> About Me</span>
                </motion.h2>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    {aboutData.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}

                    {/* Contact Details in About Section */}
                    <motion.div
                        className={styles.aboutContactDetails}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <h3>Contact Information</h3>
                        <ul className={styles.contactList}>
                            {aboutData.contact.map((item) => {
                                const Icon = contactIconMap[item.key] || EmailRoundedIcon;
                                return (
                                    <li key={item.key} className={styles.contactListItem}>
                                        <strong><Icon fontSize="small" /> {item.label}:</strong>
                                        <a href={item.href} target={item.key === 'email' || item.key === 'phone' ? undefined : '_blank'} rel={item.key === 'email' || item.key === 'phone' ? undefined : 'noopener noreferrer'}>{item.value}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                </motion.div>
            </motion.section>

            <motion.section
                id="skills"
                className={styles.skills}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className={styles.titleWithIcon}><AutoAwesomeRoundedIcon /> Skills & Expertise</span>
                </motion.h2>
                <div className={styles.categorizedSkills}> {/* Container for categorized skills */}
                    {Object.entries(categorizedSkillsData).map(([category, skills], index) => (
                        <div key={index} className={styles.skillCategory}>
                            <h3 className={styles.skillCategoryTitle}>{category}</h3> {/* Category Title */}
                            <motion.div
                                className={styles.skillsGrid}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6, staggerChildren: 0.1 }}
                            >
                                <Suspense fallback={<p className={styles.cardLoading}>Loading skills...</p>}>
                                    {skills.map((skill, skillIndex) => (
                                        <SkillCard key={skillIndex} skill={skill} />
                                    ))}
                                </Suspense>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                id="projects"
                className={styles.projects}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className={styles.titleWithIcon}><WorkRoundedIcon /> Projects</span>
                </motion.h2>
                <motion.div
                    className={styles.projectsGrid}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, staggerChildren: 0.2 }}
                >
                    <Suspense fallback={<p className={styles.cardLoading}>Loading projects...</p>}>
                        {projectsData.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </Suspense>
                </motion.div>
            </motion.section>

            <motion.section
                id="experience"
                className={styles.experience}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className={styles.titleWithIcon}><BusinessCenterRoundedIcon /> Experience</span>
                </motion.h2>
                <motion.div
                    className={styles.experienceList}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, staggerChildren: 0.2 }}
                >
                    {experienceData.map((exp, index) => (
                        <motion.div
                            className={styles.experienceItem}
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <h3 className={styles.jobTitle}>{exp.title}</h3>
                            <h4 className={styles.companyName}><ApartmentRoundedIcon fontSize="small" /> {exp.company}</h4>
                            <p className={styles.dateLocation}>
                                <span className={styles.metaBadge}><CalendarMonthRoundedIcon fontSize="small" /> {exp.date}</span>
                                <span className={styles.metaBadge}><LocationOnRoundedIcon fontSize="small" /> {exp.location}</span>
                            </p>
                            <ul className={styles.descriptionList}>
                                {exp.description.map((desc, descIndex) => (
                                    <li key={descIndex} className={styles.descriptionItem}>{desc}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Additional Experience Section */}
            <motion.section
                id="additional-experience" // Unique ID for navbar link
                className={`${styles.experience} ${styles.additionalExperience}`} // Reusing experience styles for consistency
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className={styles.titleWithIcon}><BusinessCenterRoundedIcon /> Additional Experience</span> {/* Section Title */}
                </motion.h2>
                <motion.div
                    className={styles.experienceList} // Reusing experienceList styles
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, staggerChildren: 0.2 }}
                >
                    {additionalExperienceData.map((exp, index) => (
                        <motion.div
                            className={styles.experienceItem} // Reusing experienceItem styles
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <h3 className={styles.jobTitle}>{exp.title}</h3> {/* Reusing jobTitle styles */}
                            <h4 className={styles.companyName}><ApartmentRoundedIcon fontSize="small" /> {exp.company}</h4> {/* Reusing companyName styles */}
                            <p className={styles.dateLocation}>
                                <span className={styles.metaBadge}><CalendarMonthRoundedIcon fontSize="small" /> {exp.date}</span>
                                <span className={styles.metaBadge}><LocationOnRoundedIcon fontSize="small" /> {exp.location}</span>
                            </p> {/* Reusing dateLocation styles */}
                            <ul className={styles.descriptionList}> {/* Reusing descriptionList styles */}
                                {exp.description.map((desc, descIndex) => (
                                    <li key={descIndex} className={styles.descriptionItem}>{desc}</li> // Reusing descriptionItem styles
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Education Section */}
            <motion.section
                id="education"
                className={styles.education}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className={styles.titleWithIcon}><SchoolRoundedIcon /> Education</span>
                </motion.h2>
                <motion.div
                    className={styles.educationList}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, staggerChildren: 0.2 }}
                >
                    <Suspense fallback={<p className={styles.cardLoading}>Loading education...</p>}>
                        {educationData.map((edu, index) => (
                            <EducationCard key={index} education={edu} />
                        ))}
                    </Suspense>
                </motion.div>
            </motion.section>


            {/* Achievements & Extracurricular Activities Section */}
            <motion.section
                id="achievements" // Unique ID for navbar link
                className={styles.experience} // Reusing experience styles for consistency
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className={styles.titleWithIcon}><WorkspacePremiumRoundedIcon /> Achievements & Extracurricular Activities</span> {/* Section Title */}
                </motion.h2>
                <motion.div
                    className={styles.experienceList} // Reusing experienceList styles
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, staggerChildren: 0.2 }}
                >
                    {achievementsData.map((achievement, index) => (
                        <motion.div
                            className={styles.experienceItem} // Reusing experienceItem styles
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <h3 className={styles.jobTitle}>{achievement.title}</h3> {/* Reusing jobTitle styles */}
                            <h4 className={styles.companyName}><ApartmentRoundedIcon fontSize="small" /> {achievement.company}</h4> {/* Reusing companyName styles */}
                            {achievement.date && (
                                <p className={styles.dateLocation}>
                                    <span className={styles.metaBadge}><CalendarMonthRoundedIcon fontSize="small" /> {achievement.date}</span>
                                    {achievement.location && <span className={styles.metaBadge}><LocationOnRoundedIcon fontSize="small" /> {achievement.location}</span>}
                                </p>
                            )} {/* Reusing dateLocation styles */}
                            <ul className={styles.descriptionList}> {/* Reusing descriptionList styles */}
                                {achievement.description.map((desc, descIndex) => (
                                    <li key={descIndex} className={styles.descriptionItem}>{desc}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Courses Section */}
            <motion.section
                id="courses" // Unique ID for navbar link
                className={styles.courses}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className={styles.titleWithIcon}><MenuBookRoundedIcon /> Courses</span> {/* Section Title */}
                </motion.h2>
                <motion.div
                    className={styles.courseList}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, staggerChildren: 0.2 }}
                >
                    <Suspense fallback={<p className={styles.cardLoading}>Loading courses...</p>}>
                        {coursesData.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </Suspense>
                </motion.div>
            </motion.section>


            {/* Research Paper Sections */}
            <motion.section
                id="Papers"
                className={styles.experience}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className={styles.titleWithIcon}><ScienceRoundedIcon /> Research Papers</span>
                </motion.h2>
                <motion.div
                    className={styles.PaperList}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, staggerChildren: 0.2 }}
                >
                    {researchpapersData.map((papers, index) => (
                        <motion.div
                            className={styles.PaperItem}
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <h3 className={styles.PaperTitle}>{papers.title}</h3>
                            <h4 className={styles.OrganizerName}><ApartmentRoundedIcon fontSize="small" /> {papers.organizer}</h4>
                            <h5 className={styles.PaperInstitution}><SchoolRoundedIcon fontSize="small" /> {papers.institution}</h5>
                            <p className={styles.dateLocation}>
                                <span className={styles.metaBadge}><CalendarMonthRoundedIcon fontSize="small" /> {papers.date}</span>
                                <span className={styles.metaBadge}><LocationOnRoundedIcon fontSize="small" /> {papers.location}</span>
                            </p>
                            <ul className={styles.descriptionList}>
                                {papers.description.map((desc, descIndex) => (
                                    <li key={descIndex} className={styles.descriptionItem}>{desc}</li>
                                ))}
                            </ul>
                            <div className={styles.paperActions}>
                                {papers.paperLink ? (
                                    <a href={papers.paperLink} target="_blank" rel="noopener noreferrer" className={styles.paperLinkButton}>
                                        <LaunchRoundedIcon fontSize="small" />
                                        <span>View Live Paper</span>
                                    </a>
                                ) : (
                                    <span className={styles.paperStatusMessage}>
                                        <InfoOutlinedIcon fontSize="small" />
                                        <span>The paper has been presented but not published yet. It is currently in press and will be published soon.</span>
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>



            <motion.section
                id="contact"
                className={styles.contact}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className={styles.titleWithIcon}><AlternateEmailRoundedIcon /> Contact Me</span>
                </motion.h2>
                <motion.div
                    className={styles.contactInfo}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <p className={styles.contactText}>
                        Feel free to reach out to me for any questions or opportunities!  Or use the form below to get in touch 'Within 48 hours' .
                    </p>

                    {/* Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className={styles.contactForm}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.formLabel}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={styles.formInput}
                                value={formData.name}
                                onChange={handleChange}
                                aria-invalid={Boolean(fieldErrors.name)}
                                required
                            />
                            {fieldErrors.name && <p className={styles.fieldError}>{fieldErrors.name}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles.formInput}
                                value={formData.email}
                                onChange={handleChange}
                                aria-invalid={Boolean(fieldErrors.email)}
                                required
                            />
                            {fieldErrors.email && <p className={styles.fieldError}>{fieldErrors.email}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.formLabel}>Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                className={styles.formTextarea}
                                value={formData.message}
                                onChange={handleChange}
                                aria-invalid={Boolean(fieldErrors.message)}
                                required
                            />
                            {fieldErrors.message && <p className={styles.fieldError}>{fieldErrors.message}</p>}
                        </div>
                        <motion.button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSending}
                            whileHover={!isSending ? { scale: 1.05 } : undefined}
                            whileTap={!isSending ? { scale: 0.95 } : undefined}
                            transition={{ duration: 0.3 }}
                        >
                            {isSending ? 'Sending...' : 'Get Connected'}
                        </motion.button>
                    </motion.form>
                    {feedback && (
                        <motion.div
                            className={`${styles.feedbackMessage} ${feedbackType === 'error' ? styles.feedbackError : styles.feedbackSuccess}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p>{feedback}</p>
                            {debugHint && <p className={styles.debugHint}>{debugHint}</p>}
                        </motion.div>
                    )}
                </motion.div>
                <div className={styles.googleFormBox}>
                    <span className={styles.googleFormText}>
                        <BoltRoundedIcon fontSize="small" /> For a faster response (within <strong>2 hours</strong>), fill out the attached Google form:
                    </span>
                    <a
                        href={externalLinks.googleForm}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.googleFormButton}
                    >
                        Get in Touch with Sushil
                    </a>
                </div>
            </motion.section>
        </div>
    );
}

export default Home;