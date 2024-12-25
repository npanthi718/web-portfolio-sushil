import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Briefcase, Calendar } from "lucide-react";

const techExperiences = [
  {
    title: "Tech Intern",
    company: "Anishk Sustainable Development Foundation",
    location: "Chhattisgarh, India",
    period: "April 2024 – present",
    type: "Remote",
    points: [
      "Contributed to developing scalable software solutions for sustainable development initiatives.",
      "Conducted research on emerging technologies to support project innovation.",
      "Provided technical support and ensured smooth execution of software projects.",
      "Collaborated with teams to achieve project milestones efficiently.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Pantech Prolabs India Pvt Ltd",
    location: "Chennai, India",
    period: "July 2024 – October 2024",
    type: "Remote",
    points: [
      "Collaborated with the development team on meaningful projects under the supervision of senior leadership.",
      "Gained hands-on experience in software development, debugging, and documentation.",
      "Enhanced technical skills by working on real-world applications in a remote, online setting.",
      "Contributed innovative ideas to team discussions and project development.",
      "Developed strong collaboration, time management, and problem-solving skills in a professional environment.",
    ],
  },
];

const additionalExperiences = [
  {
    title: "Manager",
    company: "New Sushant Chamena Griha",
    location: "Kathmandu, Nepal",
    period: "April 2020 – June 2023",
    type: "On-site",
    points: [
      "Managed inventory, finances, and supplier relations effectively",
    ],
  },
  {
    title: "Marketing Director",
    company: "Vision Dreamery Private Limited",
    location: "Kathmandu, Nepal",
    period: "November 2022 – April 2023",
    type: "On-site",
    points: [
      "Oversaw marketing campaigns to enhance brand visibility and drive revenue growth.",
      "Conducted market research to inform strategy development.",
      "Led team efforts to design and execute impactful campaigns.",
    ],
  },
  {
    title: "Motivational Speaker",
    company: "Sarva Sikshya Educational Center",
    location: "Kathmandu, Nepal",
    period: "November 2022 – April 2023",
    type: "On-site",
    points: [
      "Delivered engaging speeches to inspire individuals to overcome challenges and achieve goals.",
      "Tailored presentations to suit audience needs, fostering motivation and personal growth.",
    ],
  },
  {
    title: "Sales and Marketing Specialist",
    company: "Emporium Marketing Private Limited",
    location: "West Bengal, India",
    period: "August 2021 – October 2022",
    type: "On-site",
    points: [
      "Developed and executed marketing programs to promote products and expand the customer base.",
      "Engaged in lead generation and strengthened distributor relationships.",
    ],
  },
  {
    title: "Sales Supervisor",
    company: "Bishal Impex",
    location: "Kathmandu, Nepal",
    period: "January 2021 – July 2021",
    type: "On-site",
    points: [
      "Led a team of sales associates, optimizing sales processes and mentoring staff.",
      "Managed inventory and ensured high levels of customer satisfaction.",
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 flex items-center gap-2">
          <Briefcase className="w-8 h-8" />
          Technical Experience
        </h2>
        <div className="space-y-6 mb-12">
          {techExperiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 flex items-center gap-2">
          <Briefcase className="w-8 h-8" />
          Additional Experience
        </h2>
        <div className="space-y-6">
          {additionalExperiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const ExperienceCard = ({ experience, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <Card className="glass hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-heading font-semibold gradient-text">{experience.title}</h3>
            <p className="text-muted-foreground">{experience.company}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {experience.period}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>{experience.location}</span>
          <span>•</span>
          <span>{experience.type}</span>
        </div>
        <ul className="list-disc list-inside space-y-2">
          {experience.points.map((point, idx) => (
            <li key={idx} className="text-sm text-muted-foreground">
              {point}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </motion.div>
);
