import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { BookOpen } from "lucide-react";

const courses = [
  {
    title: "Data Structures and Algorithms (DSA)",
    institution: "Arpna College",
    period: "October 2024 – August 2025",
    location: "New Delhi, India",
    points: [
      "Focus on mastering foundational and advanced DSA concepts for coding interviews and problem-solving.",
      "Covers topics such as arrays, linked lists, stacks, queues, trees, graphs, hashmaps, and dynamic programming.",
      "Emphasis on time and space complexity analysis.",
      "Includes a variety of practice problems on popular platforms like Leetcode, CodeForces, and HackerRank.",
      "Develops problem-solving skills through competitive programming and algorithmic challenges.",
    ]
  },
  {
    title: "Full Stack Development (MERN Stack)",
    institution: "Arpna College",
    period: "October 2024 – August 2025",
    location: "New Delhi, India",
    points: [
      "Comprehensive training on MERN stack technologies: MongoDB, Express.js, React.js, and Node.js.",
      "Learn to build modern, scalable, and dynamic web applications from scratch.",
      "Hands-on projects, including designing and deploying responsive web applications.",
      "Includes integration of REST APIs, database management, and state management tools like Redux.",
      "Exposure to industry best practices in coding, debugging, and deployment on platforms like AWS or Heroku.",
    ]
  }
];

export const Courses = () => {
  return (
    <section id="courses" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 flex items-center gap-2">
          <BookOpen className="w-8 h-8" />
          Courses
        </h2>
        <div className="space-y-6">
          {courses.map((course, index) => (
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
                    <div>
                      <h3 className="text-xl font-heading font-semibold gradient-text">{course.title}</h3>
                      <p className="text-muted-foreground">{course.institution}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {course.period}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{course.location}</p>
                  <ul className="list-disc list-inside space-y-2">
                    {course.points.map((point, idx) => (
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