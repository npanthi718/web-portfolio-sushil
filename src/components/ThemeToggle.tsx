import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="theme-toggle-container fixed top-4 right-4 z-50"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="theme-toggle-button rounded-full"
      >
        {theme === "dark" ? (
          <Sun className="theme-toggle-icon h-5 w-5" />
        ) : (
          <Moon className="theme-toggle-icon h-5 w-5" />
        )}
      </Button>
    </motion.div>
  );
};