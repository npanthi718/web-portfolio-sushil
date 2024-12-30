import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Starting login process for:", email);
      
      // First, sign in with email/password
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (signInError) {
        console.error("Authentication error:", signInError);
        throw signInError;
      }

      if (!authData.user) {
        throw new Error("No user data returned");
      }

      console.log("User authenticated successfully:", authData.user.id);

      // Then check if user is admin
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", authData.user.id)
        .single();

      console.log("Profile data:", profileData);

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        throw profileError;
      }

      if (!profileData?.is_admin) {
        throw new Error("Unauthorized access - not an admin user");
      }

      // Success - redirect to dashboard
      toast({
        title: "Welcome back!",
        description: "Successfully logged in as admin.",
      });
      navigate("/admin/dashboard");
      
    } catch (error: any) {
      console.error("Login process error:", error);
      
      // Handle specific error cases
      let errorMessage = "An unexpected error occurred";
      
      if (error.message === "Invalid login credentials") {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.message === "Unauthorized access - not an admin user") {
        errorMessage = "This account does not have admin privileges.";
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login-container min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent/20 p-4">
      <Card className="admin-login-card w-full max-w-md">
        <CardHeader className="admin-login-header space-y-1">
          <CardTitle className="admin-login-title text-2xl font-heading flex items-center gap-2">
            <Lock className="admin-login-icon w-6 h-6" />
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="admin-login-error mb-4">
              <AlertCircle className="admin-login-error-icon h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="admin-login-form space-y-4">
            <div className="admin-login-email-container space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="admin-login-email-input"
              />
            </div>
            <div className="admin-login-password-container space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="admin-login-password-input pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="admin-login-password-toggle absolute right-2 top-2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="admin-login-password-toggle-icon h-4 w-4" />
                ) : (
                  <Eye className="admin-login-password-toggle-icon h-4 w-4" />
                )}
              </Button>
            </div>
            <Button 
              type="submit" 
              className="admin-login-submit w-full" 
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;