import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
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
          Experience
        </h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-heading font-semibold">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span>{exp.location}</span>
                    <span>•</span>
                    <span>{exp.type}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-2">
                    {exp.points.map((point, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};