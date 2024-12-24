import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export const Hero = () => {
  const handleDownload = () => {
    // TODO: Add download link
    const link = document.createElement("a");
    link.href = "/path-to-your-resume.pdf";
    link.download = "Sushil_Panthi_Resume.pdf";
    link.click();
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center section-padding pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <h2 className="text-2xl md:text-3xl font-heading mb-4">Hello, I'm</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
              Sushil Panthi
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              Full Stack Developer (MERN)
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-x-4"
            >
              <Button onClick={handleDownload} className="text-lg">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center md:justify-end"
          >
            <Avatar className="w-64 h-64 border-4 border-primary">
              <AvatarImage src="/lovable-uploads/bbd07e70-b699-4932-98c0-c0739b9ecd4e.png" alt="Sushil Panthi" />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </div>
    </section>
  );
};