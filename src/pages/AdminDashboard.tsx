import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { ContentList } from "@/components/admin/ContentList";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NewSectionForm } from "@/components/admin/NewSectionForm";
import { Button } from "@/components/ui/button";
import { LogOut, Plus, Save } from "lucide-react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Certificates } from "@/components/Certificates";
import { Courses } from "@/components/Courses";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";

const AdminDashboard = () => {
  const [sections, setSections] = useState<Tables<"resume_content">[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
    fetchData();
    subscribeToChanges();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", session.user.id)
      .single();

    if (!profile?.is_admin) {
      navigate("/");
    }
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("resume_content")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setSections(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveContent = async (sectionId: string, content: any) => {
    try {
      const { error } = await supabase
        .from("resume_content")
        .update({ content })
        .eq("id", sectionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      
      setEditingSection(null);
      fetchData(); // Refresh data to update both preview and content list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const subscribeToChanges = () => {
    const channel = supabase
      .channel("content-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "resume_content" },
        fetchData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-heading">Portfolio Content Management</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Section
            </Button>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid gap-8">
            <ContentList 
              sections={sections} 
              onUpdate={fetchData}
              onEdit={setEditingSection}
              onSave={handleSaveContent}
              editingSection={editingSection}
            />
          </div>

          <div className="space-y-8 border-t pt-8">
            <h2 className="text-2xl font-heading mb-4">Live Preview</h2>
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
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <NewSectionForm 
              onSuccess={() => {
                setIsDialogOpen(false);
                fetchData();
              }}
              currentSections={sections}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;