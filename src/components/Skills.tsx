import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

const skills = {
  technical: [
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "Python",
    "SQL",
    "C",
    "C++",
    "HTML",
    "CSS",
    "JavaScript",
  ],
  tools: ["Git", "Power BI", "Data Visualization", "Microsoft Office Suite"],
  soft: [
    "Leadership",
    "Team Management",
    "Communication",
    "Collaboration",
    "Time Management",
    "Problem-Solving",
  ],
};

export const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-accent/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold mb-8"
        >
          Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.soft.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};