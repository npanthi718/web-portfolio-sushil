import { motion } from "framer-motion";
import { Tables } from "@/integrations/supabase/types";
import { ContentEditor } from "./ContentEditor";

interface ContentListProps {
  sections: Tables<"resume_content">[];
  onUpdate: () => void;
  onEdit: (sectionId: string) => void;
  onSave: (sectionId: string, content: any) => void;
  editingSection: string | null;
}

export const ContentList = ({ sections, onUpdate, onEdit, onSave, editingSection }: ContentListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid gap-6">
        {sections.map((section) => (
          <ContentEditor
            key={section.id}
            section={section}
            onUpdate={onUpdate}
            onEdit={() => onEdit(section.id)}
            onSave={(content) => onSave(section.id, content)}
            isEditing={editingSection === section.id}
          />
        ))}
      </div>
    </motion.div>
  );
};