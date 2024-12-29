import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

export const AdminButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed top-4 right-20 z-[100] glass hover:scale-105 transition-transform duration-300 flex items-center gap-2"
      onClick={() => navigate("/admin/login")}
    >
      <Settings className="admin-icon w-4 h-4" />
      Admin
    </Button>
  );
};