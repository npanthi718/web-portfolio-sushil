import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SectionHeader } from "./SectionHeader";
import { SectionContent } from "./SectionContent";

interface ContentEditorProps {
  section: Tables<"portfolio_content">;
  onUpdate: () => void;
}

export const ContentEditor = ({ section, onUpdate }: ContentEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(section.content || "");
  const [sectionName, setSectionName] = useState(section.section_name);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("portfolio_content")
        .update({ 
          content: content,
          section_name: sectionName 
        })
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

  const handleToggleVisibility = async () => {
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
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("portfolio_content")
        .delete()
        .eq("id", section.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Section deleted successfully",
      });
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
    <>
      <Card className="glass">
        <CardContent className="p-4 space-y-4">
          <SectionHeader
            sectionName={sectionName}
            isEditing={isEditing}
            isVisible={section.is_visible || false}
            onSectionNameChange={setSectionName}
            onReorder={handleReorder}
            onToggleVisibility={handleToggleVisibility}
            onToggleEdit={() => setIsEditing(!isEditing)}
            onDelete={() => setShowDeleteDialog(true)}
          />
          {isEditing && (
            <SectionContent
              content={content}
              onContentChange={setContent}
              onSave={handleSave}
            />
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the section
              and its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};