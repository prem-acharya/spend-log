import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ReactElement } from "react";
import { toast } from "sonner";

interface ConfirmAlertProps {
  title: string;
  description: string;
  children: ReactElement;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
  successMessage?: string;
}

export function ConfirmAlert({
  title,
  description,
  children,
  onConfirm,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "default",
  successMessage,
}: ConfirmAlertProps) {
  const handleConfirm = () => {
    onConfirm();
    if (successMessage) {
      toast.success(successMessage);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={(e) => e.stopPropagation()}>
              {cancelText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={variant}
              onClick={(e) => {
                e.stopPropagation();
                handleConfirm();
              }}
            >
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
