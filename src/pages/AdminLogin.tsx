import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LoginForm } from "@/components/admin/LoginForm";
import { LoginError } from "@/components/admin/LoginError";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network and try again.");
      }

      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (signInError) {
        if (signInError.message.includes("Service Temporarily Unavailable")) {
          throw new Error("Supabase service is temporarily unavailable. Please try again in a few minutes.");
        }
        throw signInError;
      }

      if (!authData.user) {
        throw new Error("No user data returned");
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", authData.user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      if (!profileData?.is_admin) {
        throw new Error("Unauthorized access - not an admin user");
      }

      toast({
        title: "Welcome back!",
        description: "Successfully logged in as admin.",
      });
      navigate("/admin/dashboard");
      
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred";
      
      if (error.message === "Invalid login credentials") {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.message === "Unauthorized access - not an admin user") {
        errorMessage = "This account does not have admin privileges.";
      } else if (error.message.includes("Service Temporarily Unavailable")) {
        errorMessage = "The authentication service is temporarily unavailable. Please try again in a few minutes.";
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network and try again.";
      }

      setError(errorMessage);
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const retryConnection = () => {
    setError("");
    if (navigator.onLine) {
      toast({
        title: "Connection Restored",
        description: "You can now try logging in again.",
      });
    } else {
      toast({
        title: "Still Offline",
        description: "Please check your internet connection.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="admin-login-container min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-accent/20 to-background p-4">
      <Card className="admin-login-card w-full max-w-md">
        <CardHeader className="admin-login-header space-y-1">
          <CardTitle className="admin-login-title text-2xl font-heading flex items-center gap-2">
            <Lock className="admin-login-title-icon w-6 h-6" />
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent className="admin-login-content">
          <LoginError 
            error={error} 
            onRetry={retryConnection}
            showRetry={error.includes("unavailable") || !navigator.onLine}
          />
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            onSubmit={handleLogin}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;