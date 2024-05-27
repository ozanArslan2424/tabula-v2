"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import { LoadingIcon } from "@/components/ui/loading";
import { deleteNote } from "@/lib/actions/delete";
import { updateNoteTitle } from "@/lib/actions/update";
import { NoteType } from "@/lib/types";
import { DownloadIcon, PenBoxIcon, SaveIcon, Trash2Icon, XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { SmallFormButtons } from "../form-buttons";

type NoteHeaderProps = {
  note: NoteType;
  focused: boolean;
  markdown: string;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
};

export const NoteHeader = ({ note, focused, setFocused, handleSave, markdown }: NoteHeaderProps) => {
  const [titleState, setTitleState] = useState(note.title);
  const [state, setState] = useState<"default" | "editing" | "downloading" | "deleting">("default");
  const [isPending, startTransition] = useTransition();

  const handleTitleChange = (e: React.FormEvent) => {
    e.preventDefault();
    updateNoteTitle(note.id, titleState);
    setState("default");
  };

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    const link = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = `${titleState}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
    setState("default");
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      deleteNote(note.id, note.bookId);
    });
  };

  return (
    <div className="title-bar w-full">
      {state === "editing" && (
        <form className="flex w-full items-center justify-between" onSubmit={handleTitleChange}>
          <Input
            value={titleState}
            onChange={(e) => setTitleState(e.target.value)}
            name="title"
            id="title"
            autoFocus
            type="text"
            className="text-sm font-semibold capitalize md:text-lg"
          />
          <SmallFormButtons onCancel={() => setState("default")} />
        </form>
      )}
      {state === "downloading" && (
        <form className="flex w-full items-center justify-between" onSubmit={handleDownload}>
          <p className="md:text-md text-sm font-semibold">
            Are you sure you want to download &quot;{titleState}&quot; as a markdown file?
          </p>
          <SmallFormButtons onCancel={() => setState("default")} />
        </form>
      )}

      {state === "deleting" && (
        <form className="flex w-full items-center justify-between" onSubmit={handleDelete}>
          {isPending ? (
            <div className="flex w-full items-center justify-center gap-4">
              <p className="md:text-md text-sm font-semibold">Deleting...</p>
              <LoadingIcon />
            </div>
          ) : (
            <>
              <div>
                <p className="md:text-md text-sm font-semibold">
                  Are you sure you want to delete <span className="font-bold">&quot;{titleState}&quot;</span>?
                </p>
                <p className="text-sm font-semibold text-danger md:text-xs">This action cannot be undone.</p>
              </div>
              <SmallFormButtons onCancel={() => setState("default")} />
            </>
          )}
        </form>
      )}

      {state === "default" && (
        <>
          <button
            className="w-max rounded-md border border-transparent px-3 py-1.5 text-left transition-all hover:border-primary/10 hover:shadow-sm"
            onClick={() => setState("editing")}
          >
            <h2 className="text-md font-semibold capitalize md:text-lg">{titleState}</h2>
          </button>
          <div className="flex items-center gap-2">
            {focused ? (
              <>
                <Button className="text-danger" variant="outline" size="icon_sm" onClick={() => setFocused(false)}>
                  <span className="sr-only">Stop editing, don&apos;t save</span>
                  <XIcon size={16} />
                </Button>
                <Button variant="outline" size="icon_sm" onClick={handleSave}>
                  <span className="sr-only">Save note</span>
                  <SaveIcon size={16} />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="icon_sm" onClick={() => setFocused(true)}>
                  <span className="sr-only">Start editing</span>
                  <PenBoxIcon size={16} />
                </Button>
                <Button
                  size="icon_sm"
                  variant="outline"
                  className="hover:text-accent"
                  onClick={() => setState("downloading")}
                >
                  <span className="sr-only">Download note</span>
                  <DownloadIcon size={14} />
                </Button>
                <Button
                  size="icon_sm"
                  variant="outline"
                  className="transition-colors hover:bg-danger/50"
                  onClick={() => setState("deleting")}
                >
                  <span className="sr-only">Delete note</span>
                  <Trash2Icon size={16} />
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
