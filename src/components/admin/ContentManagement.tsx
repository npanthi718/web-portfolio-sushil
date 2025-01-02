import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout, Eye, EyeOff } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

interface ContentManagementProps {
  sections: Tables<"resume_content">[];
  onToggleVisibility: (section: Tables<"resume_content">) => void;
}

export const ContentManagement = ({ sections, onToggleVisibility }: ContentManagementProps) => {
  return (
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
                onClick={() => onToggleVisibility(section)}
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
  );
};