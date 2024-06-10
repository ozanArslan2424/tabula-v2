"use client";
import Button from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingIcon } from "@/components/ui/loading";
import { deleteBook } from "@/lib/actions/delete";
import { BookInfoType } from "@/lib/types";
import {
    CheckSquareIcon,
    MoreVerticalIcon,
    NotebookTextIcon,
    Settings2Icon,
    Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import BookSettingsForm from "../forms/book-settings";

export default function BookItem({ book }: { book: BookInfoType }) {
    const [isPending, startTransition] = useTransition();
    const [state, setState] = useState<"default" | "editing" | "deleting">(
        "default",
    );

    const bookInfo = useMemo(
        () => ({
            ...book,
        }),
        [book],
    );

    const createdAtString = bookInfo.createdAt.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const handleDelete = () => {
        startTransition(() => {
            deleteBook(book.id);
        });
    };

    if (isPending) {
        return (
            <div className="flex min-h-[180px] w-full items-center justify-center rounded-md border shadow">
                <LoadingIcon />
            </div>
        );
    }
    if (state === "editing") {
        return (
            <div className="flex h-full min-h-[180px] w-full flex-col justify-between rounded-md border border-primary/60 p-4 text-left shadow transition-all">
                <BookSettingsForm
                    bookId={bookInfo.id}
                    bookTitle={bookInfo.title}
                    bookDescription={bookInfo.description}
                    bookHasTasks={bookInfo.hasTasks}
                    closeDialog={() => setState("default")}
                />
            </div>
        );
    }

    if (state === "deleting") {
        return (
            <form className="flex h-full min-h-[180px] w-full flex-col justify-between rounded-md border border-primary/60 p-4 text-left shadow transition-all">
                <p className="text-md">
                    Are you sure you want to delete this book?
                </p>
                <p className="mb-2 text-sm text-danger">
                    This action cannot be undone!
                </p>

                <div className="flex items-center justify-end gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setState("default")}
                    >
                        Cancel
                    </Button>
                    <Button size="sm" variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </form>
        );
    }

    return (
        <div className="relative h-full min-h-[180px] w-full text-left">
            <div className="absolute right-2 top-2 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            onClick={(e) => e.preventDefault()}
                            size="icon"
                            variant="ghost"
                        >
                            <MoreVerticalIcon size={14} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            className="flex items-center gap-2"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setState("editing");
                            }}
                        >
                            <Settings2Icon size={14} className="shrink-0" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-2"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setState("deleting");
                            }}
                        >
                            <Trash2Icon size={14} className="shrink-0" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Link
                href={`/${bookInfo.id}`}
                key={bookInfo.id}
                className="flex h-full min-h-[180px] flex-col justify-between rounded-md border p-4 transition-all hover:border-primary/60 hover:shadow active:border-primary/60 active:shadow"
            >
                <div>
                    <p className="mb-2 text-xs text-muted-foreground">
                        {createdAtString}
                    </p>
                    <h2 className="line-clamp-2 hyphens-auto text-wrap break-words text-xl font-semibold capitalize">
                        {bookInfo.title}
                    </h2>
                    <p className="line-clamp-2 hyphens-auto text-wrap break-words text-muted-foreground ">
                        {bookInfo.description}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="mt-2 flex w-max items-center justify-center gap-2 rounded-sm border border-primary/50 px-2 py-1 text-foreground">
                        <NotebookTextIcon size={14} />
                        <p className="text-xs">{bookInfo.notes.length}</p>
                    </div>
                    {bookInfo.hasTasks && (
                        <div className="mt-2 flex w-max items-center justify-center gap-2 rounded-sm bg-emerald-500 px-2 py-1 text-black">
                            <CheckSquareIcon size={14} />
                            <p className="text-xs">{bookInfo.tasks.length}</p>
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
}
