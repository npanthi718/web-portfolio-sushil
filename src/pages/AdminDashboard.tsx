import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { motion } from "framer-motion";
import { ContentManagement } from "@/components/admin/ContentManagement";
import { ThemeManagement } from "@/components/admin/ThemeManagement";

const AdminDashboard = () => {
  const [sections, setSections] = useState<Tables<"portfolio_content">[]>([]);
  const [themes, setThemes] = useState<Tables<"theme_settings">[]>([]);
  const [loading, setLoading] = useState(true);
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
      // Force navigation to login on error
      navigate("/admin/login");
    }
  };

  const handleToggleVisibility = async (section: Tables<"portfolio_content">) => {
    try {
      const { error } = await supabase
        .from("portfolio_content")
        .update({ is_visible: !section.is_visible })
        .eq("id", section.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Section ${section.is_visible ? "hidden" : "shown"} successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleActivateTheme = async (theme: Tables<"theme_settings">) => {
    try {
      // First, save current theme to history
      if (themes.find(t => t.is_active)) {
        const currentTheme = themes.find(t => t.is_active);
        if (currentTheme) {
          await supabase.from("theme_history").insert({
            theme_id: currentTheme.id,
            theme_data: currentTheme
          });
        }
      }

      // Deactivate all themes
      await supabase
        .from("theme_settings")
        .update({ is_active: false })
        .neq("id", theme.id);

      // Activate selected theme
      const { error } = await supabase
        .from("theme_settings")
        .update({ is_active: true })
        .eq("id", theme.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Theme "${theme.theme_name}" activated successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-heading">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <ContentManagement
            sections={sections}
            onToggleVisibility={handleToggleVisibility}
          />
          <ThemeManagement
            themes={themes}
            onActivateTheme={handleActivateTheme}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;