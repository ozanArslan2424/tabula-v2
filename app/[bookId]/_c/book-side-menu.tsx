"use client";
import BookSettingsForm from "@/components/parts/book-settings";
import Button from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";

import TaskList from "./task-list";

import { toSnakeCase } from "@/lib/utils";

import {
    BookTextIcon,
    ChevronRight,
    CodeIcon,
    HomeIcon,
    SettingsIcon,
    UserCogIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
    userId: string;
    currentBook: {
        id: string;
        title: string;
        description: string | null;
        hasTasks: boolean;
        tasks: {
            id: string;
            name: string;
            bookId: string;
            userId: string;
            completed: boolean;
        }[];
        notes: {
            title: string;
            createdAt: Date;
        }[];
    };
    bookList: {
        id: string;
        title: string;
        type: string;
    }[];
};

export default function BookSideMenu({ userId, currentBook, bookList }: Props) {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <aside className="grid max-h-[100dvh] max-w-[80vw] grid-cols-[80vw] grid-rows-[60px_60px_calc(100dvh-140px)_20px] border-r md:max-w-[20vw] md:grid-cols-[20vw]">
            <div className="grid max-h-[60px] max-w-[80vw] grid-cols-[max-content_max-content] grid-rows-[60px] items-center border-b px-4 md:max-w-[20vw] md:grid-cols-[auto_max-content]">
                <h1 className="truncate pr-2 text-xl font-semibold capitalize">
                    {currentBook.title}
                </h1>
                <Button
                    variant="outline"
                    size="icon_sm"
                    onClick={() => setSettingsOpen(true)}
                >
                    <SettingsIcon size={14} />
                    <span className="sr-only">Book Settings</span>
                </Button>
            </div>
            <div className="flex max-w-[80vw] items-center justify-start gap-2 border-b px-4 md:max-h-[60px]">
                <Link href="/dash">
                    <Button variant="outline" size="icon_sm">
                        <HomeIcon size={14} />
                        <span className="sr-only">Back to library</span>
                    </Button>
                </Link>
                <Link href="/settings">
                    <Button variant="outline" size="icon_sm">
                        <UserCogIcon size={14} />
                        <span className="sr-only">User settings</span>
                    </Button>
                </Link>
                <ThemeToggle />
            </div>
            <div className="max-h-[calc(100dvh-140px)] max-w-[80vw] overflow-y-scroll md:max-w-[20vw]">
                {settingsOpen ? (
                    <div className="p-4">
                        <BookSettingsForm
                            bookId={currentBook.id}
                            bookTitle={currentBook.title}
                            bookDescription={currentBook.description}
                            bookHasTasks={currentBook.hasTasks}
                            closeDialog={() => setSettingsOpen(false)}
                        />
                    </div>
                ) : (
                    <>
                        {currentBook.hasTasks && (
                            <div id="side_menu_tasks_list" className="py-4">
                                <h3 className="px-6 pb-2 text-lg font-medium">
                                    Tasks
                                </h3>
                                <TaskList
                                    userId={userId}
                                    bookId={currentBook.id}
                                    tasks={currentBook.tasks}
                                />
                            </div>
                        )}
                        <div id="side_menu_notes_list" className="py-4">
                            <h3 className="px-6 pb-2 text-lg font-medium">
                                Notes
                            </h3>
                            <div className="flex flex-col gap-1 px-6">
                                {currentBook.notes
                                    .sort(
                                        (a, b) =>
                                            a.createdAt.getTime() -
                                            b.createdAt.getTime(),
                                    )
                                    .map((note, i) => (
                                        <Link
                                            href={`#${toSnakeCase(note.title)}`}
                                            key={i}
                                            className="group relative flex w-full items-center justify-start gap-4 truncate rounded-sm px-2 py-1 text-sm capitalize hover:bg-secondary"
                                        >
                                            <ChevronRight
                                                className="transition-transform group-hover:translate-x-2"
                                                size={14}
                                            />
                                            {note.title}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                        <div id="side_menu_books_list" className="pb-4">
                            <h3 className="px-6 pb-2 text-lg font-medium">
                                Other Books
                            </h3>
                            <div className="flex flex-col gap-1 px-6">
                                {bookList
                                    .filter(
                                        (book) => book.id !== currentBook.id,
                                    )
                                    .sort((a, b) =>
                                        a.title.localeCompare(b.title),
                                    )
                                    .map((book, i) => (
                                        <Link
                                            href={`/${book.id}`}
                                            key={i}
                                            className="group flex w-full items-center justify-start gap-4 truncate rounded-sm px-2 py-1 text-sm capitalize hover:bg-secondary"
                                        >
                                            {book.type === "notebook" && (
                                                <BookTextIcon
                                                    size={14}
                                                    className="transition-transform group-hover:translate-x-1 group-hover:rotate-3 group-hover:scale-125"
                                                />
                                            )}
                                            {book.type === "codebook" && (
                                                <CodeIcon
                                                    size={14}
                                                    className="transition-transform group-hover:translate-x-1 group-hover:rotate-3 group-hover:scale-125"
                                                />
                                            )}
                                            {book.title}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div
                id="side_menu_bottom_bar"
                className="max-h-[20px] max-w-[80vw] md:max-w-[20vw]"
            ></div>
        </aside>
    );
}
