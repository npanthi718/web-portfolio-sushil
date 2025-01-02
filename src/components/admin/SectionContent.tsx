import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface SectionContentProps {
  content: any;
  onContentChange: (value: any) => void;
  onSave: () => void;
}

export const SectionContent = ({ content, onContentChange, onSave }: SectionContentProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={JSON.stringify(content, null, 2)}
        onChange={(e) => {
          try {
            const parsedContent = JSON.parse(e.target.value);
            onContentChange(parsedContent);
          } catch (error) {
            // Allow invalid JSON while typing
            onContentChange(e.target.value);
          }
        }}
        className="min-h-[200px] font-mono"
        placeholder="Enter section content as JSON..."
      />
      <Button onClick={onSave} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
};