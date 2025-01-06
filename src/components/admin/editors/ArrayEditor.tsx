import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextEditor } from "./TextEditor";
import { Plus, Trash } from "lucide-react";

interface ArrayEditorProps {
  label: string;
  items: any[];
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, key: string, value: string) => void;
}

export const ArrayEditor = ({ 
  label, 
  items, 
  onAddItem, 
  onRemoveItem, 
  onUpdateItem 
}: ArrayEditorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold capitalize">{label.replace(/_/g, ' ')}</h4>
        <Button
          onClick={onAddItem}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add {label}
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-4">
            {Object.entries(item).map(([key, value]) => (
              <TextEditor
                key={key}
                label={key}
                value={String(value)}
                onChange={(newValue) => onUpdateItem(index, key, newValue)}
              />
            ))}
            <Button
              onClick={() => onRemoveItem(index)}
              variant="destructive"
              size="sm"
              className="flex items-center gap-2"
            >
              <Trash className="w-4 h-4" />
              Remove
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};