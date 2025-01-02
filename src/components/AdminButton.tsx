import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const AdminButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Hide button on login page
  if (location.pathname === "/admin/login") {
    return null;
  }

  const clearAuthData = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('sb-')) {
        localStorage.removeItem(key);
      }
    });
  };

  const handleAdminClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (location.pathname.includes('/admin')) {
        try {
          await supabase.auth.signOut();
          toast({
            title: "Logged out successfully",
            description: "You have been logged out of the admin panel",
          });
        } catch (error: any) {
          if (error.message?.includes('session_not_found') || 
              error.status === 403 || 
              error.message?.includes('JWT')) {
            toast({
              title: "Session Expired",
              description: "Your session has expired. Please log in again.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Logout Error",
              description: "There was a problem logging out. Please try again.",
            });
          }
        }
        clearAuthData();
        navigate("/admin/login");
      } else {
        navigate("/admin/login");
      }
    } catch (error: any) {
      console.error("Error during admin action:", error);
      clearAuthData();
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem with your session. Please log in again.",
      });
      navigate("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-[100] hover:scale-105 transition-transform duration-300 flex items-center gap-2 bg-background/80 backdrop-blur-sm"
      onClick={handleAdminClick}
      disabled={isLoading}
    >
      <UserRound className="w-4 h-4" />
      {location.pathname.includes('/admin') ? 'Logout' : 'Admin'}
    </Button>
  );
};