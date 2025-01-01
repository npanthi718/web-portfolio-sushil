import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface SectionContentProps {
  content: string;
  onContentChange: (value: string) => void;
  onSave: () => void;
}

export const SectionContent = ({ content, onContentChange, onSave }: SectionContentProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="min-h-[200px]"
        placeholder="Enter section content..."
      />
      <Button onClick={onSave} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
};