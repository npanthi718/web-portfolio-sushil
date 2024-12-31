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
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex flex-col gap-2">
        {error}
        {showRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="self-start mt-2"
          >
            Retry Connection
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};