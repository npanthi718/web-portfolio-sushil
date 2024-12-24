import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

export const About = () => {
  return (
    <section id="about" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">About Me</h2>
        <Card className="glass">
          <CardContent className="p-6">
            <p className="text-lg leading-relaxed">
              Ambitious and detail-oriented Full Stack Developer specializing in the MERN stack, with a solid academic
              foundation in Computer Applications and extensive hands-on project experience. Skilled in designing,
              developing, and deploying scalable and responsive web applications. Proficient in data analysis, visualization,
              and collaborative team efforts. Open to relocation or remote opportunities, aiming to contribute innovative
              solutions to dynamic tech environments.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};