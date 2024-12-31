import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LogOut, Edit, Trash, Plus, Check, X, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [sections, setSections] = useState<Tables<"resume_sections">[]>([]);
  const [themes, setThemes] = useState<Tables<"resume_themes">[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newSection, setNewSection] = useState({
    section_name: "",
    content: "",
    order_index: 0,
  });
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
        supabase.from("resume_sections").select("*").order("order_index"),
        supabase.from("resume_themes").select("*"),
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
      .channel("resume-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "resume_sections" },
        fetchData
      )
      .subscribe();

    const themesChannel = supabase
      .channel("theme-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "resume_themes" },
        fetchData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sectionsChannel);
      supabase.removeChannel(themesChannel);
    };
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleAddSection = async () => {
    try {
      const { error } = await supabase.from("resume_sections").insert([
        {
          section_name: newSection.section_name,
          content: JSON.stringify({ content: newSection.content }),
          order_index: sections.length,
        },
      ]);

      if (error) throw error;

      setNewSection({ section_name: "", content: "", order_index: 0 });
      toast({
        title: "Success",
        description: "Section added successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateSection = async (section: Tables<"resume_sections">) => {
    try {
      const { error } = await supabase
        .from("resume_sections")
        .update(section)
        .eq("id", section.id);

      if (error) throw error;

      setEditingSection(null);
      toast({
        title: "Success",
        description: "Section updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteSection = async (id: string) => {
    try {
      const { error } = await supabase
        .from("resume_sections")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Section deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const activateTheme = async (theme: Tables<"resume_themes">) => {
    try {
      await supabase
        .from("resume_themes")
        .update({ is_active: false })
        .neq("id", theme.id);

      const { error } = await supabase
        .from("resume_themes")
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

        {/* Resume Content Management */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Resume Content Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Section Form */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Add New Section</h3>
              <div className="space-y-2">
                <Input
                  placeholder="Section Name"
                  value={newSection.section_name}
                  onChange={(e) =>
                    setNewSection({ ...newSection, section_name: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Content"
                  value={newSection.content}
                  onChange={(e) =>
                    setNewSection({ ...newSection, content: e.target.value })
                  }
                />
                <Button onClick={handleAddSection}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>
            </div>

            {/* Existing Sections */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Existing Sections</h3>
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-lg space-y-2"
                >
                  {editingSection === section.id ? (
                    <div className="space-y-2">
                      <Input
                        value={section.section_name}
                        onChange={(e) =>
                          setSections(sections.map((s) =>
                            s.id === section.id
                              ? { ...s, section_name: e.target.value }
                              : s
                          ))
                        }
                      />
                      <Textarea
                        value={JSON.parse(section.content as string).content}
                        onChange={(e) =>
                          setSections(sections.map((s) =>
                            s.id === section.id
                              ? {
                                  ...s,
                                  content: JSON.stringify({
                                    content: e.target.value,
                                  }),
                                }
                              : s
                          ))
                        }
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleUpdateSection(section)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingSection(null)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{section.section_name}</h4>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingSection(section.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSection(section.id)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {JSON.parse(section.content as string).content}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resume Themes */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Resume Themes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {themes.map((theme) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{theme.theme_name}</h4>
                    <Button
                      variant={theme.is_active ? "default" : "outline"}
                      onClick={() => activateTheme(theme)}
                      disabled={theme.is_active}
                    >
                      {theme.is_active ? "Active" : "Activate"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
