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
      className="fixed top-16 right-4 z-50" // Positioned below the admin button
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="theme-toggle-button rounded-full bg-background/80 backdrop-blur-sm"
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