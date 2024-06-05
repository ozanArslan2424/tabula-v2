import { NoteItem } from "@/components/core/note/note-item";
import NewNoteForm from "@/components/forms/new-note";
import { getBookContent } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
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
    <div className="flex snap-x snap-mandatory overflow-y-hidden overflow-x-scroll">
      {currentBook.notes
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map((note) => {
          return <NoteItem key={note.id} note={note} />;
        })}
      <NewNoteForm bookId={currentBook.id} />
    </div>
  );
}
