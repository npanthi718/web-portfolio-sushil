import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Trophy, Leaf, Theater } from "lucide-react";

const achievements = [
  {
    title: "President, Nature Club",
    organization: "Vinaya Memorial Secondary School",
    period: "2020 – 2021",
    location: "Kathmandu, Nepal",
    icon: <Leaf className="w-5 h-5 text-primary" />,
    points: [
      "Led tree plantation drives, clean-up campaigns, and biodiversity seminars.",
      "Promoted eco-friendly practices like recycling and waste reduction in school.",
      "Organized field trips and workshops to foster environmental awareness.",
      "Collaborated with communities to address environmental challenges.",
    ],
  },
  {
    title: "President, Child Club",
    organization: "Vinaya Memorial Secondary School",
    period: "2019 – 2021",
    location: "Kathmandu, Nepal",
    icon: <Trophy className="w-5 h-5 text-primary" />,
    points: [
      "Led initiatives to promote child rights, education, and personal development.",
      "Organized awareness programs, talent shows, and leadership workshops.",
      "Fostered teamwork and community engagement through various school activities.",
      "Collaborated with students and teachers to address child-related issues.",
    ],
  },
  {
    title: "Cultural Program Coordinator",
    organization: "Vinaya Memorial Secondary School",
    period: "2018 – 2021",
    location: "Kathmandu, Nepal",
    icon: <Theater className="w-5 h-5 text-primary" />,
    points: [
      "Organized and coordinated school cultural events and festivals.",
      "Promoted cultural awareness and student participation in arts and traditions.",
      "Managed event planning, scheduling, and resource allocation.",
      "Fostered teamwork and creativity among students through cultural activities.",
    ],
  },
];

export const Achievements = () => {
  return (
    <section id="achievements" className="section-padding bg-gradient-to-b from-accent/50 to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 flex items-center gap-2">
          <Trophy className="w-8 h-8" />
          Achievements & Extracurricular Activities
        </h2>
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass hover:scale-[1.02] transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {achievement.icon}
                      <div>
                        <h3 className="text-xl font-heading font-semibold gradient-text">{achievement.title}</h3>
                        <p className="text-muted-foreground italic">{achievement.organization}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.period} | {achievement.location}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2">
                    {achievement.points.map((point, idx) => (
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