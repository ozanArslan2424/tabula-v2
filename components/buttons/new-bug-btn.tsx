"use client";
import BugForm from "@/components/forms/new-bug";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { BugIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  userEmail: string;
};

export const BugReport = ({ userEmail }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <BugIcon size={14} className="mr-2" />
          Submit a bug
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit a bug</DialogTitle>
          <DialogDescription>Please explain the bug, I will look into it as fast as I can :&#41;</DialogDescription>
        </DialogHeader>
        <BugForm email={userEmail} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
