import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-accent/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 flex items-center gap-2">
          <Mail className="w-8 h-8" />
          Contact
        </h2>
        <Card className="glass">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">npanthi718@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+977 9823009467 (WhatsApp)</p>
                    <p className="text-muted-foreground">+91 7602018437 (Calling)</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">Kathmandu-044600, Nepal</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold">Languages</h3>
                    <p className="text-muted-foreground">English (Fluent)</p>
                    <p className="text-muted-foreground">Nepali (Native)</p>
                    <p className="text-muted-foreground">Hindi (Fluent)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};