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
} from '@/components/ui/alert-dialog';
import { Trash2Icon, XIcon } from 'lucide-react';
import type { FC } from 'react';

export type RemoveColorAlertProps = { onConfirm: () => void };

export const RemoveColorAlert: FC<RemoveColorAlertProps> = ({ onConfirm }) => (
  <AlertDialog>
    <AlertDialogTrigger className="base-border group grid h-7 w-7 place-content-center rounded-full transition-colors hover:bg-error/15">
      <Trash2Icon className="w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500" />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this palette.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="group flex items-center gap-2 rounded-2xl bg-transparent shadow-none">
          <XIcon className="w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400" />
          <span className="capitalize transition-colors group-hover:text-blue-400">
            Cancel
          </span>
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="base-border group flex items-center gap-2 rounded-2xl bg-background-default shadow-none">
          <Trash2Icon className="w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500" />
          <span className="font-medium capitalize transition-colors group-hover:text-red-500">
            Delete
          </span>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
