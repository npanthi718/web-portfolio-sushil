import { Button } from "@/components/ui/button";
import { Plus, LogOut } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface DashboardHeaderProps {
  onLogout: () => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

export const DashboardHeader = ({ onLogout, isDialogOpen, setIsDialogOpen }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      <h1 className="text-3xl font-heading">Admin Dashboard</h1>
      <div className="flex gap-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add New Section
            </Button>
          </DialogTrigger>
        </Dialog>
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};