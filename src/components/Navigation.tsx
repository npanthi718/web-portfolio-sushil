import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, Code, Briefcase, FolderGit2, GraduationCap, Award, BookOpen, Mail, Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "#hero", label: "Home", icon: <Home className="w-4 h-4" /> },
  { href: "#about", label: "About", icon: <User className="w-4 h-4" /> },
  { href: "#skills", label: "Skills", icon: <Code className="w-4 h-4" /> },
  { href: "#experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
  { href: "#projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" /> },
  { href: "#education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
  { href: "#achievements", label: "Achievements", icon: <Award className="w-4 h-4" /> },
  { href: "#certificates", label: "Certificates", icon: <Award className="w-4 h-4" /> },
  { href: "#courses", label: "Courses", icon: <BookOpen className="w-4 h-4" /> },
  { href: "#contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-heading font-bold gradient-text"
            >
              SP
            </motion.span>
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                      "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-50 p-2 bg-background/80 backdrop-blur-lg rounded-full border"
        >
          <Menu className="w-6 h-6" />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center justify-center h-full">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 p-4 text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.icon}
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};