import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Palette,
  Layout,
  LogOut,
  Plus,
  Save,
  Eye,
  EyeOff,
  Trash,
} from "lucide-react";

interface ThemeSettings {
  id: string;
  theme_name: string;
  colors: any;
  fonts: any;
  animations: any;
  is_active: boolean;
}

interface PortfolioContent {
  id: string;
  section_name: string;
  content: any;
  order_index: number;
  is_visible: boolean;
}

const AdminDashboard = () => {
  const [themes, setThemes] = useState<ThemeSettings[]>([]);
  const [sections, setSections] = useState<PortfolioContent[]>([]);
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

  const toggleSectionVisibility = async (section: PortfolioContent) => {
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

  const activateTheme = async (theme: ThemeSettings) => {
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

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Content Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{section.section_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Order: {section.order_index}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSectionVisibility(section)}
                  >
                    {section.is_visible ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Theme Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{theme.theme_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {theme.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => activateTheme(theme)}
                    disabled={theme.is_active}
                  >
                    {theme.is_active ? "Active" : "Activate"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;