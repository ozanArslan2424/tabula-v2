import NewNoteForm from "@/components/forms/new-note";
import NotePaper from "@/components/parts/note-paper";
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

    if (!user) redirect("/login");

    const currentBook = await getBookContent(bookId);

    if (!currentBook || currentBook.userId !== user.id) redirect("/dash");

    return (
        <main className="flex h-[calc(100dvh-60px)] max-h-[calc(100dvh-60px)] max-w-[100vw] snap-x snap-mandatory overflow-y-hidden overflow-x-scroll md:h-[100dvh] md:max-h-[100dvh] md:max-w-[80vw]">
            {currentBook.notes
                .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                .map((note) => (
                    <NotePaper note={note} key={note.id} />
                ))}
            <NewNoteForm bookId={currentBook.id} />
        </main>
    );
}
