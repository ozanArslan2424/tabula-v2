"use client";
import NewBookForm from "@/components/forms/new-book";
import Button from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

export default function CreateBookButton({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircleIcon size={18} className="shrink-0" />
          <span>New Book</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <NewBookForm userId={userId} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
