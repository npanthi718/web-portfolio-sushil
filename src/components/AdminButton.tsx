import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export const AdminButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }
      if (event === 'SIGNED_OUT') {
        navigate("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Hide button on login page
  if (location.pathname === "/admin/login") {
    return null;
  }

  const handleAdminClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (location.pathname.includes('/admin')) {
        try {
          // Clear local storage first to ensure clean state
          localStorage.removeItem('supabase.auth.token');
          await supabase.auth.signOut();
          toast({
            title: "Logged out successfully",
            description: "You have been logged out of the admin panel",
          });
          navigate("/admin/login");
        } catch (error: any) {
          console.error("Logout error:", error);
          // Force clean logout anyway
          localStorage.clear();
          navigate("/admin/login");
          toast({
            title: "Session ended",
            description: "Your session has ended. Please log in again.",
          });
        }
      } else {
        navigate("/admin/login");
      }
    } catch (error: any) {
      console.error("Error during admin action:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem. Please try again.",
      });
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