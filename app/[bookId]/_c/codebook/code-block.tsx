"use client";
import { NoteType } from "@/lib/types";
import { useEffect, useState } from "react";

type Props = {
    note: NoteType;
};

export default function CodeBlock({ note }: Props) {
    const [html, setHtml] = useState("");

    useEffect(() => {
        if (!note.content) return;
        // markdownToHtml(note.content).then((res) => {
        //     setHtml(res);
        // });
    });

    return (
        <div className="prose-sm max-h-[40vh] overflow-scroll">
            <div
                className="no-tailwind"
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />
        </div>
    );
}
