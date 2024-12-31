import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const AdminButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminClick = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // If logged in, try to logout
        try {
          await supabase.auth.signOut();
          toast({
            title: "Logged out successfully",
            description: "You have been logged out of the admin panel",
          });
        } catch (error: any) {
          // If logout fails due to invalid session, just redirect to login
          console.log("Logout error:", error);
        }
      }
      
      // Always navigate to login page
      navigate("/admin/login");
      
    } catch (error: any) {
      console.error("Session check error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem processing your request",
      });
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