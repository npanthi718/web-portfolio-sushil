import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, ArrowDown, Save, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

interface ContentEditorProps {
  section: Tables<"portfolio_content">;
  onUpdate: () => void;
}

export const ContentEditor = ({ section, onUpdate }: ContentEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(section.content || "");
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("portfolio_content")
        .update({ content: content })
        .eq("id", section.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      setIsEditing(false);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleReorder = async (direction: "up" | "down") => {
    try {
      const { error } = await supabase
        .from("portfolio_content")
        .update({
          order_index: direction === "up" ? section.order_index - 1 : section.order_index + 1,
        })
        .eq("id", section.id);

      if (error) throw error;
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{section.section_name}</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReorder("up")}
              className="p-2"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReorder("down")}
              className="p-2"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="p-2"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {isEditing && (
          <div className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
            <Button onClick={handleSave} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};