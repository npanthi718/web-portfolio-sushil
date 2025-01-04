import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { UserRound } from "lucide-react";

export const AdminButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide button on login page
  if (location.pathname === "/admin/login") {
    return null;
  }

  const handleClick = () => {
    if (location.pathname.includes('/admin')) {
      navigate("/");
    } else {
      navigate("/admin/login");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-[100] hover:scale-105 transition-transform duration-300 flex items-center gap-2 bg-background/80 backdrop-blur-sm"
      onClick={handleClick}
    >
      <UserRound className="w-4 h-4" />
      {location.pathname.includes('/admin') ? 'Exit Admin' : 'Admin'}
    </Button>
  );
};