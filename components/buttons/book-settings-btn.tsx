"use client";
import BookSettingsForm from "@/components/forms/book-settings";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { BookInfoType, BookType } from "@/lib/types";
import { Settings2Icon } from "lucide-react";
import { useState } from "react";

type Props = {
  menuItem?: boolean;
  book: BookInfoType | BookType;
};

export default function BookSettings({ menuItem, book }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        {menuItem ? (
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <Settings2Icon size={14} className="shrink-0" />
            <span>Edit</span>
          </DropdownMenuItem>
        ) : (
          <Button variant="outline" size="icon">
            <Settings2Icon size={18} className="shrink-0" />
            <span className="sr-only">Book settings</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book settings</DialogTitle>
          <DialogDescription>Don&apos;t forget to save your changes before closing this dialog.</DialogDescription>
        </DialogHeader>

        <BookSettingsForm book={book} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
