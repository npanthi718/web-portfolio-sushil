import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Award } from "lucide-react";

const certificates = [
  {
    title: "Completion Training on 'Full Stack Development'",
    issuer: "The Byte Brain (TBB)",
    year: "2024"
  },
  {
    title: "Completion Training on 'Fundamentals of Logistic & Linear Regression Modeling'",
    issuer: "YBI Foundation",
    year: "2023"
  },
  {
    title: "Certificate of Appreciation",
    issuer: "Cultural Program Coordinator VMSS",
    year: "2018"
  },
  {
    title: "Certificate of Appreciation",
    issuer: "Best Panelist, Miles Web",
    year: "2024"
  },
  {
    title: "Basic Personality & Skill Development",
    issuer: "Vision Dreamery Pvt. Ltd.",
    year: "2023"
  },
  {
    title: "National Cadet Corps Training",
    issuer: "Nepal Army",
    year: "2017"
  },
  {
    title: "Completion Training on 'Artificial Intelligence & Data Skills'",
    issuer: "YBI Foundation",
    year: "2023"
  },
  {
    title: "Active Participation on 'Direct Selling Excellence'",
    issuer: "Direct Selling Today",
    year: "2023"
  }
];

export const Certificates = () => {
  return (
    <section id="certificates" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 flex items-center gap-2">
          <Award className="w-8 h-8" />
          Certificates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-2 gradient-text">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground mt-2">{cert.year}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};