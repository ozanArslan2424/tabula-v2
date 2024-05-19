import { NoteItem } from "@/components/core/note-item";
import NewNoteForm from "@/components/forms/new-note";
import { BookMenu } from "@/components/layout/book-menu";
import { getBookContent } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
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

  if (!currentBook || currentBook.userId !== user.id) redirect("/dash");

  return (
    <div
      className={cn(
        "grid",
        "md:grid-cols-[20vw_80vw] md:grid-rows-[calc(100dvh-48px)]",
        "grid-cols-1 grid-rows-[60px_calc(100dvh-60px)]",
      )}
    >
      <BookMenu user={user} currentBook={currentBook} />

      <main className="flex snap-x snap-mandatory overflow-y-hidden overflow-x-scroll md:col-start-2 md:col-end-3">
        {currentBook.notes
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .map((note) => {
            return <NoteItem key={note.id} note={note} />;
          })}
        <NewNoteForm bookId={currentBook.id} />
      </main>
    </div>
  );
}
