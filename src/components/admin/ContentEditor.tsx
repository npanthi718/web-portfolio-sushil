import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface ContentEditorProps {
  section: Tables<"resume_content">;
  onUpdate: () => void;
  onEdit: () => void;
  onSave: (content: any) => void;
  isEditing: boolean;
}

export const ContentEditor = ({ section, onUpdate, onEdit, onSave, isEditing }: ContentEditorProps) => {
  const [content, setContent] = useState(section.content || {});
  const [sectionName, setSectionName] = useState(section.section_name);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("resume_content")
        .update({ 
          content,
          section_name: sectionName 
        })
        .eq("id", section.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      onSave(content);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleArrayInputChange = (arrayKey: string, index: number, key: string, value: any) => {
    setContent((prev: any) => {
      const newArray = [...(prev[arrayKey] || [])];
      newArray[index] = {
        ...(newArray[index] || {}),
        [key]: value,
      };
      return {
        ...prev,
        [arrayKey]: newArray,
      };
    });
  };

  const handleAddArrayItem = (arrayKey: string) => {
    setContent((prev: any) => ({
      ...prev,
      [arrayKey]: [...(prev[arrayKey] || []), {}],
    }));
  };

  const handleRemoveArrayItem = (arrayKey: string, index: number) => {
    setContent((prev: any) => ({
      ...prev,
      [arrayKey]: prev[arrayKey].filter((_: any, i: number) => i !== index),
    }));
  };

  const handleReorder = async (direction: "up" | "down") => {
    try {
      const { error } = await supabase
        .from("resume_content")
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
        .from("resume_content")
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
        .from("resume_content")
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

  const renderContentEditor = () => {
    if (!isEditing) return null;

    return (
      <div className="space-y-4">
        {Object.entries(content).map(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <div key={key} className="space-y-4">
                <h4 className="text-lg font-semibold capitalize">{key.replace(/_/g, ' ')}</h4>
                {value.map((item: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      {Object.entries(item).map(([itemKey, itemValue]) => (
                        <div key={itemKey}>
                          <label className="text-sm font-medium capitalize">
                            {itemKey.replace(/_/g, ' ')}
                          </label>
                          {typeof itemValue === 'string' && itemValue.length > 50 ? (
                            <Textarea
                              value={itemValue}
                              onChange={(e) => handleArrayInputChange(key, index, itemKey, e.target.value)}
                              className="mt-1"
                            />
                          ) : (
                            <Input
                              value={itemValue}
                              onChange={(e) => handleArrayInputChange(key, index, itemKey, e.target.value)}
                              className="mt-1"
                            />
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => handleRemoveArrayItem(key, index)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        Remove
                      </button>
                    </div>
                  </Card>
                ))}
                <button
                  onClick={() => handleAddArrayItem(key)}
                  className="text-primary hover:text-primary/80"
                >
                  Add {key.replace(/_/g, ' ')}
                </button>
              </div>
            );
          }

          return (
            <div key={key}>
              <label className="text-sm font-medium capitalize">
                {key.replace(/_/g, ' ')}
              </label>
              {typeof value === 'string' && value.length > 50 ? (
                <Textarea
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="mt-1"
                />
              ) : (
                <Input
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="mt-1"
                />
              )}
            </div>
          );
        })}
        <button onClick={handleSave} className="w-full btn-primary">
          Save Changes
        </button>
      </div>
    );
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
            onToggleEdit={onEdit}
            onDelete={() => setShowDeleteDialog(true)}
          />
          {renderContentEditor()}
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