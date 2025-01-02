import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { RefreshCw, Palette, History } from "lucide-react";

const sampleThemes = [
  {
    name: "Modern Dark",
    primary: "#6366f1",
    secondary: "#4f46e5",
    accent: "#818cf8",
    background: "#1e1e2e",
    text: "#e2e8f0",
    font: "'Inter', sans-serif"
  },
  {
    name: "Light Minimal",
    primary: "#0ea5e9",
    secondary: "#0284c7",
    accent: "#38bdf8",
    background: "#f8fafc",
    text: "#0f172a",
    font: "'Poppins', sans-serif"
  },
  {
    name: "Nature",
    primary: "#059669",
    secondary: "#047857",
    accent: "#34d399",
    background: "#f0fdf4",
    text: "#064e3b",
    font: "'Montserrat', sans-serif"
  }
];

export const ThemeManager = ({ themes, onUpdate }: { 
  themes: Tables<"theme_settings">[]; 
  onUpdate: () => void; 
}) => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleActivateTheme = async (themeId: string) => {
    setLoading(themeId);
    try {
      // Save current theme to history
      const activeTheme = themes.find((t) => t.is_active);
      if (activeTheme) {
        await supabase.from("theme_history").insert({
          theme_id: activeTheme.id,
          theme_data: activeTheme as any,
        });
      }

      // Update theme status
      await supabase
        .from("theme_settings")
        .update({ is_active: false })
        .neq("id", themeId);

      await supabase
        .from("theme_settings")
        .update({ is_active: true })
        .eq("id", themeId);

      toast({
        title: "Success",
        description: "Theme activated successfully",
      });
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleRestoreTheme = async (themeId: string) => {
    setLoading(themeId);
    try {
      const { data: historyData, error: historyError } = await supabase
        .from("theme_history")
        .select("theme_data")
        .eq("theme_id", themeId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (historyError) throw historyError;
      
      if (!historyData) {
        toast({
          title: "No history found",
          description: "There is no previous version to restore for this theme.",
          variant: "default",
        });
        return;
      }

      const themeData = historyData.theme_data as Tables<"theme_settings">;
      await supabase
        .from("theme_settings")
        .update({
          theme_name: themeData.theme_name,
          primary_color: themeData.primary_color,
          secondary_color: themeData.secondary_color,
          accent_color: themeData.accent_color,
          background_color: themeData.background_color,
          text_color: themeData.text_color,
          font_family: themeData.font_family,
        })
        .eq("id", themeId);

      toast({
        title: "Success",
        description: "Theme restored successfully",
      });
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const ensureUniqueThemeName = (baseName: string): string => {
    const existingNames = themes.map(t => t.theme_name);
    if (!existingNames.includes(baseName)) return baseName;
    
    const timestamp = new Date().getTime();
    return `${baseName} (${timestamp})`;
  };

  const handleCreateSampleTheme = async (theme: typeof sampleThemes[0]) => {
    try {
      const uniqueThemeName = ensureUniqueThemeName(theme.name);
      
      // First check if theme name exists
      const { data: existingTheme } = await supabase
        .from("theme_settings")
        .select("id")
        .eq("theme_name", uniqueThemeName)
        .single();

      if (existingTheme) {
        toast({
          title: "Theme name already exists",
          description: "Creating theme with a unique name...",
          variant: "default",
        });
      }

      const { error } = await supabase.from("theme_settings").insert({
        theme_name: uniqueThemeName,
        primary_color: theme.primary,
        secondary_color: theme.secondary,
        accent_color: theme.accent,
        background_color: theme.background,
        text_color: theme.text,
        font_family: theme.font,
      });

      if (error) {
        if (error.code === "23505") { // Unique constraint violation
          toast({
            title: "Error",
            description: "A theme with this name already exists. Please try again.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Success",
        description: `Sample theme "${uniqueThemeName}" created successfully`,
      });
      onUpdate();
    } catch (error: any) {
      console.error("Theme creation error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sample Themes Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sample Themes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleThemes.map((theme) => (
              <Card key={theme.name} className="p-4 hover:shadow-lg transition-shadow">
                <div 
                  className="w-full h-24 rounded-lg mb-4" 
                  style={{ 
                    background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                    border: `2px solid ${theme.accent}`
                  }}
                />
                <h4 className="font-semibold mb-2">{theme.name}</h4>
                <Button 
                  onClick={() => handleCreateSampleTheme(theme)}
                  className="w-full"
                  variant="outline"
                >
                  Use This Theme
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Themes Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Active Themes</h3>
          <div className="space-y-4">
            {themes.map((theme) => (
              <Card key={theme.id} className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="font-semibold">{theme.theme_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {theme.is_active ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleActivateTheme(theme.id)}
                      disabled={theme.is_active || loading === theme.id}
                    >
                      {loading === theme.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      {theme.is_active ? "Active" : "Activate"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestoreTheme(theme.id)}
                      disabled={loading === theme.id}
                    >
                      <History className="w-4 h-4 mr-2" />
                      Restore Previous
                    </Button>
                  </div>
                </div>
                {theme.is_active && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ background: theme.primary_color }} />
                      <span>Primary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ background: theme.secondary_color }} />
                      <span>Secondary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ background: theme.accent_color }} />
                      <span>Accent</span>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
