import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ContentManagement } from "@/components/admin/ContentManagement";
import { ThemeManagement } from "@/components/admin/ThemeManagement";
import { Tables } from "@/integrations/supabase/types";

const AdminDashboard = () => {
  const [themes, setThemes] = useState<Tables<"theme_settings">[]>([]);
  const [sections, setSections] = useState<Tables<"portfolio_content">[]>([]);
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
      const [themesResponse, sectionsResponse] = await Promise.all([
        supabase.from("theme_settings").select("*").order("created_at"),
        supabase.from("portfolio_content").select("*").order("order_index"),
      ]);

      if (themesResponse.error) throw themesResponse.error;
      if (sectionsResponse.error) throw sectionsResponse.error;

      setThemes(themesResponse.data);
      setSections(sectionsResponse.data);
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
    const themesChannel = supabase
      .channel("theme-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "theme_settings" },
        fetchData
      )
      .subscribe();

    const sectionsChannel = supabase
      .channel("content-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio_content" },
        fetchData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(themesChannel);
      supabase.removeChannel(sectionsChannel);
    };
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const toggleSectionVisibility = async (section: Tables<"portfolio_content">) => {
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

  const activateTheme = async (theme: Tables<"theme_settings">) => {
    try {
      await supabase
        .from("theme_settings")
        .update({ is_active: false })
        .neq("id", theme.id);

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
    return <div>Loading...</div>;
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

        <ContentManagement 
          sections={sections}
          onToggleVisibility={toggleSectionVisibility}
        />

        <ThemeManagement 
          themes={themes}
          onActivateTheme={activateTheme}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;