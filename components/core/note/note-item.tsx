"use client";
import { updateNote } from "@/lib/actions/update";
import { NoteType } from "@/lib/types";
import { useState } from "react";
// import { remarkMark } from "remark-mark-highlight";
// import MarkdownPreview from "@uiw/react-markdown-preview";
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
    <>
      <NoteHeader note={note} focused={focused} markdown={markdown} handleSave={handleSave} setFocused={setFocused} />
      <NoteArticle focused={focused} handleSave={handleSave} markdown={markdown} setMarkdown={setMarkdown} />
    </>
  );
};
