import BookSettings from "@/components/buttons/book-settings-btn";
import { TaskList } from "@/components/core/task-list";
import MobileHeader from "@/components/layout/mobile-header";
import { getBookList } from "@/lib/actions/read";
import { BookType, UserType } from "@/lib/types";
import { toSnakeCase } from "@/lib/utils";
import { BookOpenTextIcon, BookTextIcon, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  user: UserType;
  currentBook: BookType;
};

export const BookMenu = async ({ user, currentBook }: Props) => {
  if (!user) return null;

  const bookList = await getBookList(user.id);

  return (
    <MobileHeader user={user}>
      {/* BOOK TITLE */}
      <div className="flex h-[60px] items-center justify-between border-b border-primary/10 px-4 py-2">
        <div className="flex items-center gap-4">
          <BookOpenTextIcon size={24} className="shrink-0" />
          <h2 className="text-2xl font-bold">{currentBook.title}</h2>
        </div>
        <BookSettings book={currentBook} />
      </div>

      {/* DESCRIPTION */}
      {currentBook.description && (
        <div className="p-4">
          <p className="text-sm text-primary/60">{currentBook.description}</p>
        </div>
      )}

      {/* TASKS */}
      {currentBook.hasTasks && <TaskList userId={user.id} bookId={currentBook.id} tasks={currentBook.tasks} />}

      {/* NOTES LIST */}
      {currentBook.notes.length > 0 && (
        <div className="flex flex-col gap-1 p-4">
          <h3 className="text-lg font-semibold">Note titles</h3>
          {currentBook.notes
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            .map((note) => (
              <Link
                href={`#${toSnakeCase(note.title)}`}
                key={note.id}
                className="group relative flex h-9 w-full items-center justify-start gap-4 truncate rounded-sm px-2 py-1 text-sm capitalize hover:bg-secondary"
              >
                <ChevronRight className="transition-transform group-hover:translate-x-2" size={14} />
                {note.title}
              </Link>
            ))}
        </div>
      )}

      {/* OTHER BOOKS */}
      <div className="flex flex-col gap-1 p-4">
        <h3 className="text-lg font-semibold">Other books</h3>
        {bookList &&
          bookList
            .filter((book) => book.id !== currentBook.id)
            .map((book) => {
              return (
                <Link
                  href={`/dash/${book.id}`}
                  key={book.id}
                  className="group flex h-9 w-full items-center justify-start gap-4 truncate rounded-sm px-2 py-1 text-sm capitalize hover:bg-secondary"
                >
                  <BookTextIcon
                    size={14}
                    className="transition-transform group-hover:translate-x-1 group-hover:rotate-3 group-hover:scale-125"
                  />
                  {book.title}
                </Link>
              );
            })}
      </div>
    </MobileHeader>
  );
};
