import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Trash2Icon, XIcon } from "lucide-react";

export type Props = {
  onConfirm: () => void;
};

export const RemoveColorAlert = ({ onConfirm }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <XIcon />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            palette.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="group flex items-center gap-2 rounded-3xl">
            <XIcon className="w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400" />
            <span className="capitalize transition-colors group-hover:text-blue-400">
              Cancel
            </span>
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="group flex items-center gap-2 rounded-3xl">
            <Trash2Icon className="w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500" />
            <span className="font-medium capitalize transition-colors group-hover:text-red-500">
              Delete
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
