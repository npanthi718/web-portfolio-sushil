import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const AdminButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminClick = async () => {
    setIsLoading(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        // If there's a session error, clear any stale session data
        localStorage.removeItem('supabase.auth.token');
        navigate("/admin/login");
        return;
      }
      
      if (session) {
        try {
          // Clear session and local storage
          await supabase.auth.signOut();
          localStorage.removeItem('supabase.auth.token');
          toast({
            title: "Logged out successfully",
            description: "You have been logged out of the admin panel",
          });
        } catch (error: any) {
          console.error("Logout error:", error);
          // If logout fails due to token issues, clear local storage
          if (error.message?.includes('refresh_token_not_found') || 
              error.message?.includes('session_not_found')) {
            localStorage.removeItem('supabase.auth.token');
          }
          // Show a toast but don't throw - we still want to redirect
          toast({
            variant: "destructive",
            title: "Logout Issue",
            description: "Your session has expired. Please log in again.",
          });
        }
      }
      
      // Always navigate to login page
      navigate("/admin/login");
      
    } catch (error: any) {
      console.error("Session check error:", error);
      // Clear any potentially corrupted session data
      localStorage.removeItem('supabase.auth.token');
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
    <div className="admin-controls fixed top-4 right-4 z-[100]">
      <Button
        variant="outline"
        size="sm"
        className="admin-settings-button hover:scale-105 transition-transform duration-300 flex items-center gap-2 bg-background/80 backdrop-blur-sm"
        onClick={handleAdminClick}
        disabled={isLoading}
      >
        <UserRound className="admin-settings-icon w-4 h-4" />
        Admin
      </Button>
    </div>
  );
};