"use client";
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
import Button from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

type Props = {
  menuItem?: boolean;
  onClick: () => void;
};

export default function DeleteButton({ menuItem, onClick }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogTrigger asChild>
        {menuItem ? (
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <Trash2Icon size={14} className="shrink-0" />
            <span>Delete</span>
          </DropdownMenuItem>
        ) : (
          <Button size="icon_sm" variant="outline" className="transition-colors hover:bg-danger/50">
            <span className="sr-only">Delete</span>
            <Trash2Icon size={16} />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-danger">This action cannot be undone!</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete this item?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
