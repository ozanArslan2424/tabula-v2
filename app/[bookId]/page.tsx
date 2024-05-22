import { NoteItem } from "@/components/core/note/note-item";
import NewNoteForm from "@/components/forms/new-note";
import { BookMenu } from "@/components/layout/book-menu";
import MobileHeader from "@/components/layout/mobile-header";
import { getBookContent, getBookList } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { cn, toSnakeCase } from "@/lib/utils";
import { BookOpenTextIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function BookPage({
  params: { bookId },
}: {
  params: {
    bookId: string;
  };
}) {
  const { user } = await getSession();
  if (!user) {
    redirect("/login");
  }

  const currentBook = await getBookContent(bookId);
  const bookList = await getBookList(user.id);

  if (!currentBook || currentBook.userId !== user.id) redirect("/dash");

  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-hidden md:flex-row">
      <MobileHeader>
        <div className="title-bar">
          <h1 className="h1">{currentBook.title}</h1>
          <BookOpenTextIcon size={24} className="shrink-0" />
        </div>

        <BookMenu user={user} currentBook={currentBook} bookList={bookList} />
      </MobileHeader>

      <main
        className={cn(
          "md:h-screen md:max-h-screen md:min-h-screen",
          "md:w-main md:min-w-main md:max-w-main",
          "h-main min-h-main max-h-main",
          "min-w-screen max-w-screen w-screen",
          "overflow-x-scroll",
          "flex snap-x snap-mandatory snap-start",
        )}
      >
        {currentBook.notes
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .map((note) => {
            return (
              <section
                key={note.id}
                id={toSnakeCase(note.title)}
                className={cn(
                  "snap-start",
                  // "h-dvh, max-h-dvh min-h-dvh",
                  // "md:w-note md:min-w-note md:max-w-note",
                  // "max-w-screen min-w-screen w-screen",
                  "border-b border-r border-primary/10 shadow-sm",
                )}
              >
                <NoteItem key={note.id} note={note} />
              </section>
            );
          })}
        <NewNoteForm bookId={currentBook.id} />
      </main>
    </div>
  );
}
