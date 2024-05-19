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
import { NoteType } from "@/lib/types";
import { DownloadIcon } from "lucide-react";

type Props = {
  note: NoteType;
};

export default function DownloadNoteButton({ note }: Props) {
  const markdown = `# ${note.title} \n\n---\n\n ${note.content}`;

  const downloadMarkdownFile = () => {
    const link = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = `${note.title}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon_sm" variant="outline" className="hover:text-accent">
          <DownloadIcon size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">Note with title:{note.title} will be downloaded.</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to download this note as a <code>.md</code> file?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={downloadMarkdownFile} className="bg-primary text-primary-foreground">
            Download
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
