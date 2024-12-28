import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export const AdminButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed top-4 right-20 z-50 glass"
      onClick={() => navigate("/admin/login")}
    >
      <Lock className="w-4 h-4 mr-2" />
      Admin
    </Button>
  );
};