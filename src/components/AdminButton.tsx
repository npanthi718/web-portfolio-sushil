import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";

export const AdminButton = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-controls fixed top-4 right-4 z-[100]">
      <Button
        variant="outline"
        size="sm"
        className="admin-settings-button hover:scale-105 transition-transform duration-300 flex items-center gap-2 bg-background/80 backdrop-blur-sm"
        onClick={() => navigate("/admin/login")}
      >
        <UserRound className="admin-settings-icon w-4 h-4" />
        Admin
      </Button>
    </div>
  );
};