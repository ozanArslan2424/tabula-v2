"use client";
import Message from "@/components/ui/message";
// import CodeBlock from "./_c/codebook/code-block";
// import NewCodeForm from "./_c/codebook/new-code";
import NewNoteForm from "./_c/notebook/new-note";
import NotePaper from "./_c/notebook/note-paper";

import { useBookContext } from "@/context/book-provider";
import { NoteType } from "@/lib/types";

import { LibraryLink } from "@/components/parts/link-btn";
import { useState } from "react";

export default function BookPage() {
    const currentBook = useBookContext();

    const [noteArray, setNoteArray] = useState<NoteType[]>(currentBook.notes);

    if (currentBook.type === "notebook") {
        return (
            <main className="flex h-[calc(100dvh-60px)] max-h-[calc(100dvh-60px)] max-w-[100vw] snap-x snap-mandatory overflow-y-hidden overflow-x-scroll md:h-[100dvh] md:max-h-[100dvh] md:max-w-[80vw]">
                {noteArray
                    .sort(
                        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                    )
                    .map((note) => (
                        <NotePaper
                            note={note}
                            key={note.id}
                            setNoteArray={setNoteArray}
                        />
                    ))}
                <NewNoteForm
                    bookId={currentBook.id}
                    setNoteArray={setNoteArray}
                />
            </main>
        );
    }

    if (currentBook.type === "codebook") {
        return (
            <main className="flex items-center justify-center">
                <div className="max-w-96 space-y-4">
                    <Message variant="accent">
                        <p>Not ready yet :)</p>
                    </Message>
                    <LibraryLink />
                </div>
            </main>
        );
        // return (
        //     <main>
        //         {/* TODO: Needs to be rewritten */}
        //         <NewCodeForm
        //             bookId={currentBook.id}
        //             setNoteArray={setNoteArray}
        //         />
        //         <div className="grid h-[calc(100dvh-76px)] max-h-[calc(100dvh-76px)] max-w-[100vw] grid-cols-2 gap-4 p-4 md:h-[calc(100dvh-1rem)] md:max-h-[calc(100dvh-1rem)] md:max-w-[80vw]">
        //             {noteArray
        //                 .sort(
        //                     (a, b) =>
        //                         a.createdAt.getTime() - b.createdAt.getTime(),
        //                 )
        //                 .map((note) => (
        //                     // TODO: needs styling
        //                     <CodeBlock note={note} key={note.id} />
        //                 ))}
        //         </div>
        //     </main>
        // );
    }
}
