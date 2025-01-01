import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Eye, EyeOff, Edit, Trash2 } from "lucide-react";

interface SectionHeaderProps {
  sectionName: string;
  isEditing: boolean;
  isVisible: boolean;
  onSectionNameChange: (value: string) => void;
  onReorder: (direction: "up" | "down") => void;
  onToggleVisibility: () => void;
  onToggleEdit: () => void;
  onDelete: () => void;
}

export const SectionHeader = ({
  sectionName,
  isEditing,
  isVisible,
  onSectionNameChange,
  onReorder,
  onToggleVisibility,
  onToggleEdit,
  onDelete,
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {isEditing ? (
        <Input
          value={sectionName}
          onChange={(e) => onSectionNameChange(e.target.value)}
          className="font-semibold text-lg"
        />
      ) : (
        <h3 className="text-lg font-semibold">{sectionName}</h3>
      )}
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" size="sm" onClick={() => onReorder("up")} className="p-2">
          <ArrowUp className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onReorder("down")} className="p-2">
          <ArrowDown className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onToggleVisibility} className="p-2">
          {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={onToggleEdit} className="p-2">
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="p-2 text-destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};