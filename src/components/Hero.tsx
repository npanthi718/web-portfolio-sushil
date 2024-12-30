import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { TypeAnimation } from 'react-type-animation';

export const Hero = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "public/uploads/Tech Resume Sushil Panthi.pdf";
    link.download = "Sushil_Panthi_Resume.pdf";
    link.click();
  };

  return (
    <section id="hero" className="hero-section min-h-screen flex items-center justify-center section-padding pt-24 bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="hero-content-wrapper max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-layout-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-text-container text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hero-heading-container space-y-2"
            >
              <h2 className="greeting-text text-2xl md:text-3xl font-heading mb-4 animate-fadeIn bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                Hello I am
              </h2>
              <h1 className="name-heading text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-2 animate-scale">
                <span className="name-gradient text-gradient animate-shimmer">Sushil Panthi</span>
                <span className="location-tag text-xs ml-2 text-muted-foreground">(Can Re-allocate)</span>
              </h1>
              <div className="role-animation-container text-xl md:text-2xl lg:text-3xl font-heading font-bold mb-6">
                <span className="role-text gradient-text animate-float">
                  <TypeAnimation
                    sequence={[
                      'Full Stack Developer (MERN)',
                      3000,
                      'Software Developer',
                      3000,
                      'Power BI Expert',
                      3000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="resume-button-container flex gap-4"
            >
              <Button 
                onClick={handleDownload} 
                className="resume-download-button glass hover:scale-105 transition-all duration-300 w-full sm:w-auto animate-pulse bg-gradient-to-r from-primary/80 via-purple-500/80 to-pink-500/80"
              >
                <Download className="download-icon mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="profile-image-container flex justify-center md:justify-end"
          >
            <div className="avatar-wrapper relative group">
              <div className="avatar-glow absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 animate-glow opacity-75" />
              <Avatar className="profile-avatar w-48 h-48 sm:w-64 sm:h-64 border-4 border-primary/50 shadow-xl hover:scale-105 transition-transform duration-300 animate-float">
                <AvatarImage 
                  src="public/uploads/DV.jpg" 
                  alt="Sushil Panthi" 
                  className="avatar-image object-cover"
                />
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};