import { motion } from "framer-motion";
import { Tables } from "@/integrations/supabase/types";
import { ContentEditor } from "./ContentEditor";

interface ContentListProps {
  sections: Tables<"resume_content">[];
  onUpdate: () => void;
}

export const ContentList = ({ sections, onUpdate }: ContentListProps) => {
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
          />
        ))}
      </div>
    </motion.div>
  );
};