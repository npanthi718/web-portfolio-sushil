import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { RefreshCw } from "lucide-react";

interface ThemeManagerProps {
  themes: Tables<"theme_settings">[];
  onUpdate: () => void;
}

export const ThemeManager = ({ themes, onUpdate }: ThemeManagerProps) => {
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
      const { error } = await supabase
        .from("theme_settings")
        .update({ is_active: false })
        .neq("id", themeId);

      if (error) throw error;

      const { error: activateError } = await supabase
        .from("theme_settings")
        .update({ is_active: true })
        .eq("id", themeId);

      if (activateError) throw activateError;

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
        .single();

      if (historyError) throw historyError;

      const themeData = historyData.theme_data as Tables<"theme_settings">;
      const { error: updateError } = await supabase
        .from("theme_settings")
        .update({
          theme_name: themeData.theme_name,
          primary_color: themeData.primary_color,
          secondary_color: themeData.secondary_color,
          accent_color: themeData.accent_color,
          background_color: themeData.background_color,
          text_color: themeData.text_color,
          font_family: themeData.font_family,
          is_active: themeData.is_active,
        })
        .eq("id", themeId);

      if (updateError) throw updateError;

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

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Theme Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {themes.map((theme) => (
          <Card key={theme.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{theme.theme_name}</h3>
                <p className="text-sm text-muted-foreground">
                  {theme.is_active ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleActivateTheme(theme.id)}
                  disabled={theme.is_active || loading === theme.id}
                >
                  {loading === theme.id ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    "Activate"
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRestoreTheme(theme.id)}
                  disabled={loading === theme.id}
                >
                  Restore Previous
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};