import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Code, Database, Server, Monitor, Laptop, Smartphone, Network, Globe, Wrench, Brain } from "lucide-react";

const skills = {
  technical: [
    { name: "MongoDB", icon: <Database className="w-5 h-5" /> },
    { name: "Express.js", icon: <Server className="w-5 h-5" /> },
    { name: "React.js", icon: <Code className="w-5 h-5" /> },
    { name: "Node.js", icon: <Server className="w-5 h-5" /> },
    { name: "Python", icon: <Code className="w-5 h-5" /> },
    { name: "SQL", icon: <Database className="w-5 h-5" /> },
    { name: "C", icon: <Code className="w-5 h-5" /> },
    { name: "C++", icon: <Code className="w-5 h-5" /> },
    { name: "HTML", icon: <Monitor className="w-5 h-5" /> },
    { name: "CSS", icon: <Monitor className="w-5 h-5" /> },
    { name: "JavaScript", icon: <Code className="w-5 h-5" /> },
  ],
  tools: [
    { name: "Git", icon: <Network className="w-5 h-5" /> },
    { name: "Power BI", icon: <Monitor className="w-5 h-5" /> },
    { name: "Data Visualization", icon: <Globe className="w-5 h-5" /> },
    { name: "Microsoft Office Suite", icon: <Laptop className="w-5 h-5" /> },
  ],
  soft: [
    { name: "Leadership", icon: <Brain className="w-5 h-5" /> },
    { name: "Team Management", icon: <Brain className="w-5 h-5" /> },
    { name: "Communication", icon: <Brain className="w-5 h-5" /> },
    { name: "Collaboration", icon: <Brain className="w-5 h-5" /> },
    { name: "Time Management", icon: <Brain className="w-5 h-5" /> },
    { name: "Problem-Solving", icon: <Wrench className="w-5 h-5" /> },
  ],
};

const SkillCard = ({ skill, index }: { skill: { name: string; icon: JSX.Element }; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="glass p-3 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300"
  >
    <span className="text-primary">{skill.icon}</span>
    {skill.name}
  </motion.div>
);

export const Skills = () => {
  return (
    <section id="skills" className="section-padding section-gradient">
      <div className="content-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title text-center"
        >
          Skills & Expertise
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass h-full hover:scale-105 transition-all duration-300">
              <CardContent className="card-content">
                <h3 className="text-xl font-heading font-semibold mb-6 text-center gradient-text">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.technical.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
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
            <Card className="glass h-full hover:scale-105 transition-all duration-300">
              <CardContent className="card-content">
                <h3 className="text-xl font-heading font-semibold mb-6 text-center gradient-text">
                  Tools & Platforms
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.tools.map((tool, index) => (
                    <SkillCard key={tool.name} skill={tool} index={index} />
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
            <Card className="glass h-full hover:scale-105 transition-all duration-300">
              <CardContent className="card-content">
                <h3 className="text-xl font-heading font-semibold mb-6 text-center gradient-text">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.soft.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
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