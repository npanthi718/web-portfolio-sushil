import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { ContentList } from "@/components/admin/ContentList";
import { ThemeManager } from "@/components/admin/ThemeManager";

const AdminDashboard = () => {
  const [sections, setSections] = useState<Tables<"portfolio_content">[]>([]);
  const [themes, setThemes] = useState<Tables<"theme_settings">[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSectionName, setNewSectionName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      const [sectionsResponse, themesResponse] = await Promise.all([
        supabase.from("portfolio_content").select("*").order("order_index"),
        supabase.from("theme_settings").select("*"),
      ]);

      if (sectionsResponse.error) throw sectionsResponse.error;
      if (themesResponse.error) throw themesResponse.error;

      setSections(sectionsResponse.data);
      setThemes(themesResponse.data);
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

  const handleCreateSection = async () => {
    if (!newSectionName.trim()) {
      toast({
        title: "Error",
        description: "Section name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("portfolio_content").insert({
        section_name: newSectionName,
        order_index: sections.length,
        content: "",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "New section created successfully",
      });
      setNewSectionName("");
      setIsDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const subscribeToChanges = () => {
    const sectionsChannel = supabase
      .channel("content-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio_content" },
        fetchData
      )
      .subscribe();

    const themesChannel = supabase
      .channel("theme-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "theme_settings" },
        fetchData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sectionsChannel);
      supabase.removeChannel(themesChannel);
    };
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
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
      localStorage.removeItem('supabase.auth.token');
      navigate("/admin/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader 
          onLogout={handleLogout}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Section</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Enter section name"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
              />
              <Button onClick={handleCreateSection} className="w-full">
                Create Section
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <ContentList sections={sections} onUpdate={fetchData} />
        <ThemeManager themes={themes} onUpdate={fetchData} />
      </div>
    </div>
  );
};

export default AdminDashboard;