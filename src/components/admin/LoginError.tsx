import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface LoginErrorProps {
  error: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export const LoginError = ({ error, onRetry, showRetry }: LoginErrorProps) => {
  if (!error) return null;

  return (
    <Alert variant="destructive" className="admin-login-error-alert mb-4">
      <AlertCircle className="admin-login-error-icon h-4 w-4" />
      <AlertDescription className="admin-login-error-description flex flex-col gap-2">
        {error}
        {showRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="admin-login-retry-button self-start mt-2"
          >
            Retry Connection
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};