import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

interface ThemeManagementProps {
  themes: Tables<"theme_settings">[];
  onActivateTheme: (theme: Tables<"theme_settings">) => void;
}

export const ThemeManagement = ({ themes, onActivateTheme }: ThemeManagementProps) => {
  return (
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
                onClick={() => onActivateTheme(theme)}
                disabled={theme.is_active}
              >
                {theme.is_active ? "Active" : "Activate"}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};