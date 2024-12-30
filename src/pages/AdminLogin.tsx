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

  const validateCredentials = () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateCredentials()) {
      return;
    }

    if (!navigator.onLine) {
      setError("No internet connection. Please check your network and try again.");
      return;
    }

    setLoading(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      console.log("Starting login attempt for:", { email: trimmedEmail });

      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (signInError) {
        console.error("Authentication error details:", {
          status: signInError.status,
          message: signInError.message,
          name: signInError.name,
        });

        // Check if the error is due to invalid credentials
        if (signInError.message?.includes("Invalid login credentials")) {
          throw new Error("Invalid email or password. Please check your credentials and try again.");
        }

        // For other authentication errors
        throw new Error(signInError.message || "Authentication failed. Please try again.");
      }

      if (!authData?.user?.id) {
        console.error("No user data in response:", authData);
        throw new Error("Login failed - no user data returned");
      }

      console.log("Authentication successful, checking admin status");

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", authData.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        throw new Error("Failed to verify admin status");
      }

      if (!profileData?.is_admin) {
        console.error("User not admin:", { userId: authData.user.id, profile: profileData });
        throw new Error("This account does not have admin privileges");
      }

      console.log("Admin verification successful");

      toast({
        title: "Welcome back!",
        description: "Successfully logged in as admin.",
      });
      
      navigate("/admin/dashboard");
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      const errorMessage = error.message || "An unexpected error occurred. Please try again.";
      
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
            showRetry={error.includes("connection") || !navigator.onLine}
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