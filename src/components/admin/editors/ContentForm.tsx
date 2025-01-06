import { TextEditor } from "./TextEditor";
import { ArrayEditor } from "./ArrayEditor";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ContentFormProps {
  content: any;
  onContentChange: (content: any) => void;
  onSave: () => void;
}

export const ContentForm = ({ content, onContentChange, onSave }: ContentFormProps) => {
  const handleInputChange = (key: string, value: string) => {
    onContentChange({
      ...content,
      [key]: value,
    });
  };

  const handleArrayInputChange = (arrayKey: string, index: number, key: string, value: string) => {
    const newArray = [...(content[arrayKey] || [])];
    newArray[index] = {
      ...(newArray[index] || {}),
      [key]: value,
    };
    onContentChange({
      ...content,
      [arrayKey]: newArray,
    });
  };

  const handleAddArrayItem = (arrayKey: string) => {
    onContentChange({
      ...content,
      [arrayKey]: [...(content[arrayKey] || []), {}],
    });
  };

  const handleRemoveArrayItem = (arrayKey: string, index: number) => {
    onContentChange({
      ...content,
      [arrayKey]: content[arrayKey].filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {Object.entries(content).map(([key, value]) => {
        if (Array.isArray(value)) {
          return (
            <ArrayEditor
              key={key}
              label={key}
              items={value}
              onAddItem={() => handleAddArrayItem(key)}
              onRemoveItem={(index) => handleRemoveArrayItem(key, index)}
              onUpdateItem={(index, itemKey, newValue) => 
                handleArrayInputChange(key, index, itemKey, newValue)
              }
            />
          );
        }

        return (
          <TextEditor
            key={key}
            label={key}
            value={String(value)}
            onChange={(newValue) => handleInputChange(key, newValue)}
          />
        );
      })}
      <Button onClick={onSave} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
};