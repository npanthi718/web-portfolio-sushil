import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

interface NewSectionFormProps {
  onSuccess: () => void;
  currentSections: Tables<"resume_content">[];
}

export const NewSectionForm = ({ onSuccess, currentSections }: NewSectionFormProps) => {
  const [sectionName, setSectionName] = useState("");
  const [content, setContent] = useState("{}");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const parsedContent = JSON.parse(content);
      const { error } = await supabase
        .from("resume_content")
        .insert({
          section_name: sectionName,
          content: parsedContent,
          order_index: currentSections.length,
          is_visible: true,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "New section added successfully",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Content (JSON format)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px] font-mono"
          required
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Adding..." : "Add Section"}
      </Button>
    </form>
  );
};