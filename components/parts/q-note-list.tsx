"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import { LoadingIcon } from "@/components/ui/loading";
import { createQuicknote } from "@/lib/actions/create";
import { deleteQuicknote } from "@/lib/actions/delete";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import React, { useState, useTransition } from "react";

type Props = {
    userId: string;
    quicknotes: {
        id: string;
        userId: string;
        content: string;
    }[];
};

export const QuicknoteList = ({ userId, quicknotes }: Props) => {
    const [isPending, startTransition] = useTransition();
    const [quicknoteName, setQuicknoteName] = useState<string>("");

    const handleDeleteQNote = (qNoteId: string) => {
        startTransition(() => {
            deleteQuicknote(qNoteId);
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (quicknoteName) {
            createQuicknote(quicknoteName, userId);
            setQuicknoteName("");
        }
    };
    return (
        <div className="space-y-2 px-4">
            <form
                onSubmit={handleSubmit}
                className="flex w-full items-center gap-2 py-2"
            >
                <Input
                    placeholder="Type something..."
                    type="text"
                    autoComplete="off"
                    className="h-8 max-h-8"
                    value={quicknoteName}
                    onChange={(e) => setQuicknoteName(e.target.value)}
                />
                <Button
                    type="submit"
                    size="icon_sm"
                    variant="outline"
                    className="bg-background text-foreground"
                >
                    <span className="sr-only">Add quick note</span>
                    <PlusCircleIcon size={14} className="shrink-0" />
                </Button>
            </form>
            {quicknotes.map((qNote) => (
                <div
                    key={qNote.id}
                    className="group relative flex w-full items-center justify-start gap-4 rounded-md px-2 py-1 text-sm capitalize hover:bg-secondary"
                >
                    <p className="line-clamp-2 w-full">{qNote.content}</p>
                    <Button
                        size="icon_sm"
                        variant="outline"
                        className="text-danger opacity-25 transition-opacity group-hover:opacity-100"
                        onClick={() => handleDeleteQNote(qNote.id)}
                    >
                        {isPending ? (
                            <LoadingIcon />
                        ) : (
                            <Trash2Icon size={14} className="shrink-0" />
                        )}
                    </Button>
                </div>
            ))}
        </div>
    );
};
