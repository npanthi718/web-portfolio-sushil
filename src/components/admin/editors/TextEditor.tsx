import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

export const TextEditor = ({ label, value, onChange, multiline }: TextEditorProps) => {
  const isLongText = typeof value === 'string' && value.length > 50;
  const shouldUseTextarea = multiline || isLongText;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium capitalize">
        {label.replace(/_/g, ' ')}
      </Label>
      {shouldUseTextarea ? (
        <Textarea
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1"
        />
      ) : (
        <Input
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1"
        />
      )}
    </div>
  );
};