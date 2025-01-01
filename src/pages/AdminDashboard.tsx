import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { motion } from "framer-motion";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { ThemeManager } from "@/components/admin/ThemeManager";

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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
          <div className="grid gap-6">
            {sections.map((section) => (
              <ContentEditor
                key={section.id}
                section={section}
                onUpdate={fetchData}
              />
            ))}
          </div>

          <ThemeManager themes={themes} onUpdate={fetchData} />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;