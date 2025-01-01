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

  const handleAdminClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        clearAuthData();
        navigate("/admin/login");
        return;
      }
      
      if (session) {
        try {
          await supabase.auth.signOut();
          toast({
            title: "Logged out successfully",
            description: "You have been logged out of the admin panel",
          });
        } catch (error: any) {
          console.error("Logout error:", error);
          // Handle session_not_found error gracefully
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
      }
      
      // Always clear auth data and redirect after logout attempt
      clearAuthData();
      navigate("/admin/login");
      
    } catch (error: any) {
      console.error("Session check error:", error);
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

  const clearAuthData = () => {
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('supabase.auth.refreshToken');
    // Clear any other auth-related data if needed
  };

  return (
    <div className="admin-controls fixed top-4 right-4 z-[100]">
      <Button
        variant="outline"
        size="sm"
        className="admin-settings-button hover:scale-105 transition-transform duration-300 flex items-center gap-2 bg-background/80 backdrop-blur-sm"
        onClick={handleAdminClick}
        disabled={isLoading}
      >
        <UserRound className="admin-settings-icon w-4 h-4" />
        {location.pathname.includes('/admin') ? 'Logout' : 'Admin'}
      </Button>
    </div>
  );
};