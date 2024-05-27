"use client";
import UserButton from "@/components/layout/user-btn";
import { TaskList } from "@/components/menu/task-list";
import ThemeToggle from "@/components/ui/theme-toggle";
import { User } from "lucia";
import { BookOpenTextIcon, HomeIcon, Settings2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import BookSettingsForm from "../forms/book-settings";
import { NotesList } from "../menu/notes-list";
import { OtherBooksList } from "../menu/others-list";
import Button from "../ui/button";
import LinkButton from "../ui/link-btn";

type Props = {
  user: User;
  currentBook: {
    id: string;
    title: string;
    description: string | null;
    hasTasks: boolean;
    tasks: { bookId: string; id: string; name: string; userId: string; completed: boolean }[];
    notes: { title: string; createdAt: Date }[];
  };
  bookList: { id: string; title: string }[];
};

export const BookMenu = ({ user, currentBook, bookList }: Props) => {
  const [editing, setEditing] = useState(false);

  const bookListMemo = useMemo(() => bookList, [bookList]);

  const bookInfo = {
    id: currentBook.id,
    title: currentBook.title,
    description: currentBook.description,
    hasTasks: currentBook.hasTasks,
  };

  return (
    <>
      <div className="title-bar">
        <h1 className="h1">{currentBook.title}</h1>
        <BookOpenTextIcon size={24} className="shrink-0" />
      </div>
      {editing ? (
        <div className="h-[calc(100dvh-120px)] w-menu space-y-1 overflow-x-hidden overflow-y-scroll p-4 md:h-main md:max-h-main">
          <h3 className="text-lg font-semibold">Book settings</h3>
          <BookSettingsForm bookInfo={bookInfo} closeDialog={() => setEditing(false)} />
        </div>
      ) : (
        <div className="h-[calc(100dvh-120px)] w-menu overflow-x-hidden overflow-y-scroll md:h-main md:max-h-main">
          {/* USER MENU */}
          <div className="flex gap-2 border-b border-primary/10 px-4 py-2">
            <ThemeToggle />
            <LinkButton href="/dash" variant="outline" size="icon_xs" className="bg-background">
              <HomeIcon size={12} className="shrink-0" />
              <span className="sr-only">Library</span>
            </LinkButton>
            <UserButton user={user} />

            <Button
              size="xs"
              variant="outline"
              className="min-w-fit flex-1 bg-background"
              onClick={() => setEditing(true)}
            >
              <Settings2Icon size={12} className="shrink-0" />
              <span className="shrink-0">Book settings</span>
            </Button>
          </div>

          {/* TASKS */}
          {currentBook.hasTasks && <TaskList userId={user.id} bookId={currentBook.id} tasks={currentBook.tasks} />}

          {/* NOTES LIST */}
          {currentBook.notes.length > 0 && <NotesList notes={currentBook.notes} />}

          {/* OTHER BOOKS */}
          {bookListMemo && <OtherBooksList otherBooks={bookListMemo} currentBookId={currentBook.id} />}
        </div>
      )}
    </>
  );
};
