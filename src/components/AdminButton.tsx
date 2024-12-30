import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

export const AdminButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed top-40 right-4 z-[100] admin-button-container hover:scale-105 transition-transform duration-300 flex items-center gap-2"
      onClick={() => navigate("/admin/login")}
    >
      <Settings className="admin-settings-icon w-4 h-4" />
      Admin
    </Button>
  );
};