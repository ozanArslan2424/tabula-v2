"use client";
import UserButton from "@/components/layout/user-btn";
import { TaskList } from "@/components/menu/task-list";
import ThemeToggle from "@/components/ui/theme-toggle";
import { BookType } from "@/lib/types";
import { User } from "lucia";
import { HomeIcon, Settings2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import BookSettingsForm from "../forms/book-settings";
import { NotesList } from "../menu/notes-list";
import { OtherBooksList } from "../menu/others-list";
import Button from "../ui/button";
import LinkButton from "../ui/link-btn";

type Props = {
  user: User;
  currentBook: BookType;
  bookList: { id: string; title: string }[];
};

export const BookMenu = ({ user, currentBook, bookList }: Props) => {
  const [editing, setEditing] = useState(false);

  const currentBookMemo = useMemo(
    () => ({
      ...currentBook,
    }),
    [currentBook],
  );

  const bookListMemo = useMemo(() => bookList, [bookList]);

  if (editing) {
    return (
      <div className="max-h-main h-main w-menu space-y-1 overflow-x-hidden overflow-y-scroll p-4">
        <h3 className="text-lg font-semibold">Book settings</h3>
        <BookSettingsForm book={currentBookMemo} closeDialog={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="max-h-main h-main w-menu overflow-x-hidden overflow-y-scroll">
      {/* USER MENU */}
      <div className="flex gap-2 border-b border-primary/10 px-4 py-2">
        <ThemeToggle />
        <LinkButton href="/dash" variant="outline" size="icon_xs" className="bg-background">
          <HomeIcon size={12} className="shrink-0" />
          <span className="sr-only">Library</span>
        </LinkButton>
        <UserButton user={user} />

        <Button size="xs" variant="outline" className="min-w-fit flex-1 bg-background" onClick={() => setEditing(true)}>
          <Settings2Icon size={12} className="shrink-0" />
          <span className="shrink-0">Book settings</span>
        </Button>
      </div>

      {/* TASKS */}
      {currentBookMemo.hasTasks && (
        <TaskList userId={user.id} bookId={currentBookMemo.id} tasks={currentBookMemo.tasks} />
      )}

      {/* NOTES LIST */}
      {currentBookMemo.notes.length > 0 && <NotesList notes={currentBookMemo.notes} />}

      {/* OTHER BOOKS */}
      {bookListMemo && <OtherBooksList otherBooks={bookListMemo} currentBookId={currentBookMemo.id} />}
    </div>
  );
};
