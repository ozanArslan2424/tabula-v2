"use client";

import { LoadingIcon2 } from "@/components/ui/loading";
import { createSnippet } from "@/lib/actions/create";
import { NoteType } from "@/lib/types";
import { CirclePlusIcon } from "lucide-react";

import { useState, useTransition } from "react";

type Props = {
    bookId: string;
    setNoteArray: React.Dispatch<React.SetStateAction<NoteType[]>>;
};

export default function NewCodeForm({ bookId, setNoteArray }: Props) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get("title") as string;
        const content = formData.get("snippet") as string;

        startTransition(() => {
            createSnippet({ bookId, title, content }).then((res) => {
                if (res.success) {
                    setNoteArray((prev) => [...prev, res.data]);
                    setOpen(false);
                }
            });
        });
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="flex h-[60px] w-full items-center justify-center gap-2 border-b bg-transparent p-4 text-muted-foreground transition-all hover:bg-secondary hover:text-secondary-foreground"
            >
                <CirclePlusIcon size={16} />
                <span>New Snippet</span>
            </button>
        );
    }

    if (isPending) {
        return (
            <div className="flex h-[60px] w-full items-center justify-center gap-2 border-b bg-transparent p-4 text-foreground">
                <LoadingIcon2 />
                <p className="text-foreground">Creating snippet...</p>
            </div>
        );
    }

    if (open) {
        return (
            <form
                onSubmit={handleSubmit}
                onReset={() => setOpen(false)}
                className="flex h-max flex-col border-b"
            >
                <div className="h-[59px]">
                    <input
                        name="title"
                        id="title"
                        type="text"
                        placeholder="Give your snippet a title"
                        className="h-full w-full p-4 text-sm outline-accent"
                        autoFocus
                    />
                </div>
                <textarea
                    name="snippet"
                    id="snippet"
                    placeholder="Paste or write your code here"
                    className="h-64 w-full resize-y border-y bg-transparent p-4 font-mono text-sm outline-accent"
                />
                <div className="flex justify-between ">
                    <button
                        type="reset"
                        className="w-full bg-transparent px-4 py-2 text-foreground transition-all hover:bg-secondary hover:text-secondary-foreground"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-transparent px-4 py-2 text-foreground transition-all hover:bg-secondary hover:text-secondary-foreground"
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}
