import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  onSubmit,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="admin-login-form space-y-4">
      <div className="admin-login-email-field">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="admin-login-email-input"
          disabled={loading}
        />
      </div>
      <div className="admin-login-password-field relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="admin-login-password-input pr-10"
          disabled={loading}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="admin-login-password-toggle absolute right-2 top-2"
          onClick={() => setShowPassword(!showPassword)}
          disabled={loading}
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
        className="admin-login-submit-button w-full" 
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};