import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { FolderGit2, Server, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Supermarket Management System",
    date: "November 2024",
    description: "Built advanced inventory and billing software with real-time stock updates, Employee control, and Reporting features.",
    techStack: ["MongoDB", "Express.js", "Node.js", "HTLM/CSS", "MEN Stack"],
    contributions: [
      "Automated stock updates post-sales to ensure accurate inventory.",
      "Integrated dashboards for administrators to monitor performance metrics.",
    ],
    demoUrl: "#", // Live demo URL here
    githubUrl: "https://github.com/npanthi718/SuperMarket-Management-Using-MEN-Stack", // GitHub URL here
  },
  {
    title: "Student Management System",
    date: "October 2024",
    description: "Developed a robust platform for managing student data with features like CRUD operations, course filtering, and error handling.",
    techStack: ["Python", "JavaScript", "Django", "HTLM/CSS"],
    contributions: [
      "Designed a responsive user interface for seamless interaction.",
      "Implemented secure database operations to manage sensitive information.",
    ],
    demoUrl: "#", // Live demo URL here
    githubUrl: "https://github.com/npanthi718/Student-Management-System", //GitHub URL here
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-accent/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 flex items-center gap-2">
          <FolderGit2 className="w-8 h-8" />
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass h-full hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-heading font-semibold">{project.title}</h3>
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="w-4 h-4" />
                      <span className="text-sm font-semibold">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Key Contributions:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {project.contributions.map((contribution, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          {contribution}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <FolderGit2 className="w-4 h-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};