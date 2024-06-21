"use client";
import NewNoteForm from "./_c/notebook/new-note";
import NotePaper from "./_c/notebook/note-paper";

import { useBookContext } from "../../context/book-provider";
import { CodeBlock } from "./_c/codebook/code-block";
import NewCodeForm from "./_c/codebook/new-code";

export default function BookPage() {
    const currentBook = useBookContext();

    if (currentBook.type === "notebook") {
        return (
            <main className="flex h-[calc(100dvh-60px)] max-h-[calc(100dvh-60px)] max-w-[100vw] snap-x snap-mandatory overflow-y-hidden overflow-x-scroll md:h-[100dvh] md:max-h-[100dvh] md:max-w-[80vw]">
                {currentBook.notes
                    .sort(
                        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                    )
                    .map((note) => (
                        <NotePaper note={note} key={note.id} />
                    ))}
                <NewNoteForm bookId={currentBook.id} />
            </main>
        );
    }

    if (currentBook.type === "codebook") {
        return (
            <main className="h-[calc(100dvh-76px)] max-h-[calc(100dvh-76px)] max-w-[100vw] columns-3 overflow-x-hidden overflow-y-scroll p-4 md:h-[calc(100dvh-1rem)] md:max-h-[calc(100dvh-1rem)] md:max-w-[80vw]">
                {currentBook.notes
                    .sort(
                        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                    )
                    .map((note) => (
                        // TODO: needs styling
                        <CodeBlock note={note} key={note.id} />
                    ))}
                {/* TODO: Needs to be rewritten */}
                <NewCodeForm bookId={currentBook.id} />
            </main>
        );
    }
}
