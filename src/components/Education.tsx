import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { GraduationCap, Calendar } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "School of Computer Science and Engineering, Sandip University",
    location: "Nashik, India",
    period: "July 2023 – July 2026",
  },
  {
    degree: "Secondary Level (+2)",
    institution: "Vijaya Memorial Secondary School",
    location: "Kathmandu, Nepal",
    period: "July 2021 – May 2023",
  },
  {
    degree: "Intermediate Level (10)",
    institution: "Vijaya Memorial Secondary School",
    location: "Kathmandu, Nepal",
    period: "Completed",
  },
];

export const Education = () => {
  return (
    <section id="education" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 flex items-center gap-2">
          <GraduationCap className="w-8 h-8" />
          Education
        </h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
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
                      <h3 className="text-xl font-heading font-semibold">{edu.degree}</h3>
                      <p className="text-muted-foreground">{edu.institution}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.location}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};