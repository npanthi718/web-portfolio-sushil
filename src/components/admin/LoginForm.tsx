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

  const setDefaultCredentials = () => {
    setEmail("npanthi718@gmail.com");
    setPassword("RESUME@12sushil");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
          disabled={loading}
          autoComplete="email"
        />
      </div>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full pr-10"
          disabled={loading}
          autoComplete="current-password"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2"
          onClick={() => setShowPassword(!showPassword)}
          disabled={loading}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex flex-col space-y-2">
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full text-sm"
          onClick={setDefaultCredentials}
          disabled={loading}
        >
          Use Default Admin Credentials
        </Button>
      </div>
    </form>
  );
};