"use client";
import { markdownToText, toSnakeCase } from "@/lib/utils";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import NoteTitleBar from "./note-title-bar";

type Props = {
    note: {
        id: string;
        title: string;
        content: string | null;
        bookId: string;
        createdAt: Date;
    };
};

export default function NotePaper({ note }: Props) {
    const [focused, setFocused] = useState(false);
    const [markdown, setMarkdown] = useState(note.content || "");

    function moveCaretAtEnd(e: React.FocusEvent<HTMLTextAreaElement>) {
        var temp_value = e.target.value;
        e.target.value = "";
        e.target.value = temp_value;
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if ((e.metaKey || e.ctrlKey) && e.key === "s") {
            e.preventDefault();
            handleSave();
        }
    }

    function handleSave() {
        setFocused(false);
        // updateNote(note.id, markdown);
    }

    return (
        <section
            id={toSnakeCase(note.title)}
            className="grid max-h-[calc(100dvh-60px)] max-w-[100vw] snap-start grid-cols-[100vw] grid-rows-[60px_calc(100dvh-140px)_20px] border-r md:max-w-[40vw] md:grid-cols-[40vw] md:grid-rows-[60px_calc(100dvh-80px)_20px]"
        >
            <NoteTitleBar
                focused={focused}
                note={note}
                markdown={markdown}
                setFocused={setFocused}
                handleSave={handleSave}
            />
            <article className="max-h-[calc(100dvh-140px)] max-w-[100vw] md:max-h-[calc(100dvh-80px)] md:max-w-[40vw]">
                {focused ? (
                    <textarea
                        className="h-[calc(100dvh-141px)] max-h-[calc(100dvh-141px)] w-[calc(100vw-1px)] max-w-[calc(100vw-1px)] resize-none p-4 text-xs outline-none md:h-[calc(100dvh-81px)] md:max-h-[calc(100dvh-81px)] md:w-[calc(40vw-1px)] md:max-w-[calc(40vw-1px)] md:text-sm"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        autoFocus={focused}
                        onFocus={moveCaretAtEnd}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <div className="prose-xs prose h-[calc(100dvh-141px)] max-h-[calc(100dvh-141px)] w-[calc(100vw-1px)] max-w-[calc(100vw-1px)] overflow-y-scroll p-4 dark:prose-invert md:prose-sm prose-headings:mb-2 prose-headings:mt-4 prose-p:my-1 prose-em:text-yellow-600 prose-ul:my-0 prose-ul:py-0 prose-table:m-0 prose-table:text-xs prose-hr:my-4 prose-hr:border-primary/70 dark:prose-em:text-yellow-500 md:h-[calc(100dvh-81px)] md:max-h-[calc(100dvh-81px)] md:w-[calc(40vw-1px)] md:max-w-[calc(40vw-1px)]">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeSanitize]}
                        >
                            {markdown
                                ? markdownToText(markdown)
                                : "Nothing here yet... Use the button above to start writing."}
                        </ReactMarkdown>
                    </div>
                )}
            </article>
            <div className="max-h-[20px] md:max-w-[40vw]"></div>
        </section>
    );
}
