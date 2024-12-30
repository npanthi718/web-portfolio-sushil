import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

export const AdminButton = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-controls fixed right-4 z-[100] mt-20">
      <Button
        variant="outline"
        size="sm"
        className="admin-settings-button hover:scale-105 transition-transform duration-300 flex items-center gap-2"
        onClick={() => navigate("/admin/login")}
      >
        <Settings className="admin-settings-icon w-4 h-4" />
        Admin
      </Button>
    </div>
  );
};