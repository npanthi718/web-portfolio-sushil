import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

export const About = () => {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-accent/50 to-background">
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
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Ambitious and detail-oriented Full Stack Developer specializing in the MERN stack, with a solid academic
                foundation in Computer Applications and extensive hands-on project experience. Skilled in designing,
                developing, and deploying scalable and responsive web applications. Proficient in data analysis, visualization,
                and collaborative team efforts.
              </p>
              <p className="text-lg leading-relaxed">
                Open to relocation or remote opportunities, aiming to contribute innovative solutions to dynamic tech environments.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
                  <ul className="space-y-2">
                    <li>Location: Kathmandu-044600, Nepal</li>
                    <li>Email: npanthi718@gmail.com</li>
                    <li>Phone: +977 9823009467 (WhatsApp)</li>
                    <li>Alternative: +91 7602018437 (Calling)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Interests</h3>
                  <ul className="space-y-2">
                    <li>Open-source contributions</li>
                    <li>Adventure sports</li>
                    <li>Community service</li>
                    <li>Technology Innovation</li>
                    <li>Traveling</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};