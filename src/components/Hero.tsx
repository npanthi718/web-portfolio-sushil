import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { TypeAnimation } from 'react-type-animation';

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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 gradient-text">
              Sushil Panthi
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-12">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer (MERN)',
                  1000,
                  'Can Re-allocate',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text font-semibold"
              />
            </div>
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
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl" />
              <Avatar className="w-64 h-64 border-4 border-primary/50 shadow-xl hover:scale-105 transition-transform duration-300">
                <AvatarImage src="/lovable-uploads/bbd07e70-b699-4932-98c0-c0739b9ecd4e.png" alt="Sushil Panthi" />
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};