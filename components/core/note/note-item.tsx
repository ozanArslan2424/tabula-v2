"use client";
import { updateNote } from "@/lib/actions/update";
import { NoteType } from "@/lib/types";
import { useState } from "react";
// import { remarkMark } from "remark-mark-highlight";
// import MarkdownPreview from "@uiw/react-markdown-preview";
import { toSnakeCase } from "@/lib/utils";
import { NoteArticle } from "./note-article";
import { NoteHeader } from "./note-header";

export const NoteItem = ({ note }: { note: NoteType }) => {
  const [focused, setFocused] = useState(false);
  const [markdown, setMarkdown] = useState(note.content || "");

  function handleSave() {
    setFocused(false);
    updateNote(note.id, markdown);
  }

  return (
    <section
      key={note.id}
      id={toSnakeCase(note.title)}
      className="h-dvh max-h-dvh min-h-dvh w-screen min-w-screen snap-start border-r border-primary/10 shadow-sm md:w-[40vw] md:min-w-[40vw]"
    >
      <NoteHeader note={note} focused={focused} markdown={markdown} handleSave={handleSave} setFocused={setFocused} />
      <NoteArticle focused={focused} handleSave={handleSave} markdown={markdown} setMarkdown={setMarkdown} />
    </section>
  );
};
