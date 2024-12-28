import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Certificates } from "@/components/Certificates";
import { Courses } from "@/components/Courses";
import { Achievements } from "@/components/Achievements";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    const themesChannel = supabase
      .channel("theme-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "theme_settings" },
        (payload) => {
          if (payload.eventType === "UPDATE" && payload.new.is_active) {
            // Refresh the page to apply new theme
            window.location.reload();
          }
        }
      )
      .subscribe();

    const contentChannel = supabase
      .channel("content-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio_content" },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            toast({
              title: "Content Updated",
              description: "The portfolio content has been updated.",
            });
            // Refresh the page to show new content
            window.location.reload();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(themesChannel);
      supabase.removeChannel(contentChannel);
    };
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Navigation />
      <ThemeToggle />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Certificates />
        <Courses />
        <Contact />
      </main>
    </div>
  );
};

export default Index;