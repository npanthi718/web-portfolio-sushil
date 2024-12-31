import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

  // Check session status on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session check error:", sessionError);
          return;
        }

        if (session?.user) {
          // Verify if the user is an admin
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Profile check error:", profileError);
            await supabase.auth.signOut();
            return;
          }

          if (profile?.is_admin) {
            navigate("/admin/dashboard");
          } else {
            // If not admin, sign out
            await supabase.auth.signOut();
          }
        }
      } catch (error) {
        console.error("Session verification error:", error);
      }
    };

    checkSession();
  }, [navigate]);

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
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      if (signInError) {
        throw new Error(signInError.message || "Authentication failed");
      }

      if (!authData?.user?.id) {
        throw new Error("Login failed - no user data returned");
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", authData.user.id)
        .single();

      if (profileError) {
        throw new Error("Failed to verify admin status");
      }

      if (!profileData?.is_admin) {
        // Sign out if not admin
        await supabase.auth.signOut();
        throw new Error("This account does not have admin privileges");
      }

      toast({
        title: "Welcome back!",
        description: "Successfully logged in as admin.",
      });
      
      navigate("/admin/dashboard");
      
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred";
      console.error("Login error:", error);
      
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-accent/20 to-background p-4">
      <Card className="w-full max-w-md glass">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-heading flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
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