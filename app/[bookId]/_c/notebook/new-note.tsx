"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import Label from "@/components/ui/label";
import { LoadingIcon } from "@/components/ui/loading";
import { createNote } from "@/lib/actions/create";

import { NoteType } from "@/lib/types";
import { cn } from "@/lib/utils";

import { PlusCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";

type Props = {
    bookId: string;
    setNoteArray: React.Dispatch<React.SetStateAction<NoteType[]>>;
};

export default function NewNoteForm({ bookId, setNoteArray }: Props) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || title === " " || title === "") return;

        startTransition(() => {
            createNote(bookId, title).then((res) => {
                if (res?.success) {
                    setOpen(false);
                    setNoteArray((prev) => [...prev, res.data]);
                }
            });
        });
    };

    return (
        <div
            className={cn(
                "h-[100dvh] w-[100vw] min-w-full snap-start border border-primary/10 md:w-[40vw] md:min-w-[40vw]",
                open ? "bg-muted/20" : "hover:bg-muted/20",
            )}
        >
            {!open && !isPending ? (
                <Button
                    className="h-full w-full"
                    variant="unstyled"
                    size="unsized"
                    onClick={() => setOpen(true)}
                >
                    <PlusCircleIcon className="shrink-0" size={20} />
                </Button>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col items-center justify-center gap-2 px-12"
                >
                    <Label>
                        <span>Note title</span>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            name="title"
                            id="title"
                            className="w-full max-w-full"
                            type="text"
                            placeholder="..."
                            disabled={isPending}
                            autoFocus={open}
                            required
                        />
                    </Label>

                    <Button
                        disabled={isPending}
                        type="submit"
                        size="sm"
                        className="mt-2 w-full"
                    >
                        {isPending ? <LoadingIcon size={20} /> : "Create"}
                    </Button>

                    <Button
                        disabled={isPending}
                        type="reset"
                        size="sm"
                        className="w-full"
                        variant="secondary"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                </form>
            )}
            {!open && isPending && <LoadingIcon size={20} />}
        </div>
    );
}
