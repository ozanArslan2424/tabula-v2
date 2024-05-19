"use client";
import DownloadNoteButton from "@/components/buttons/download-note";
import Button from "@/components/ui/button";
import { updateNote, updateNoteTitle } from "@/lib/actions/update";
import { NoteType } from "@/lib/types";
import { getCharacterCount, getWordCount, markdownToText } from "@/lib/utils";
import { CheckIcon, PenBoxIcon, SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
// import { remarkMark } from "remark-mark-highlight";
import { cn, toSnakeCase } from "@/lib/utils";

import DeleteButton from "@/components/core/delete-alert";
import Input from "@/components/ui/inputs/input";
import { deleteNote } from "@/lib/actions/delete";
import React from "react";

type NoteHeaderProps = {
  note: NoteType;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
};

export const NoteItem = ({ note }: { note: NoteType }) => {
  const [focused, setFocused] = useState(false);
  const [markdown, setMarkdown] = useState(note.content || "");

  function handleSave() {
    setFocused(false);
    updateNote(note.id, markdown);
  }

  const characterCount = getCharacterCount(markdown);
  const wordCount = getWordCount(markdown);

  return (
    <section
      id={toSnakeCase(note.title)}
      className={cn(
        "shrink-0 snap-start overflow-hidden",
        "border-b border-r border-primary/10 shadow-sm",
        "max-h-[calc(100dvh-60px)] w-screen md:max-h-[calc(100dvh-48px)] md:w-[48vw]",
      )}
    >
      <NoteHeader note={note} focused={focused} handleSave={handleSave} setFocused={setFocused} />
      <NoteArticle focused={focused} handleSave={handleSave} markdown={markdown} setMarkdown={setMarkdown} />
    </section>
  );
};

const NoteHeader = ({ note, focused, setFocused, handleSave }: NoteHeaderProps) => {
  const [titleState, setTitleState] = useState(note.title);
  const [editing, setEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNoteTitle(note.id, titleState);
    setEditing(false);
  };

  return (
    <div className="flex h-[60px] items-center justify-between border-b border-r border-primary/10 bg-background px-6">
      {editing ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={titleState}
            onChange={(e) => setTitleState(e.target.value)}
            name="title"
            id="title"
            autoFocus
            type="text"
            className="text-sm font-semibold capitalize md:text-lg"
          />
          <Button type="submit" variant="success" size="circle">
            <span className="sr-only">Save</span>
            <CheckIcon size={18} />
          </Button>
          <Button variant="danger" size="circle" onClick={() => setEditing(false)}>
            <span className="sr-only">Cancel</span>
            <XIcon size={18} />
          </Button>
        </form>
      ) : (
        <>
          <button
            className="w-max rounded-md border border-transparent px-3 py-1.5 text-left transition-all hover:border-primary/10 hover:shadow-sm"
            onClick={() => setEditing(true)}
          >
            <h3 className="text-sm font-semibold capitalize md:text-lg">{titleState}</h3>
          </button>
          <div className="flex items-center gap-2">
            {focused ? (
              <>
                <Button className="text-danger" variant="outline" size="icon_sm" onClick={() => setFocused(false)}>
                  <XIcon size={16} />
                </Button>
                <Button variant="outline" size="icon_sm" onClick={handleSave}>
                  <SaveIcon size={16} />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="icon_sm" onClick={() => setFocused(true)}>
                  <PenBoxIcon size={16} />
                </Button>
                <DownloadNoteButton note={note} />
                <DeleteButton onClick={() => deleteNote(note.id, note.bookId)} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

type NoteArticleProps = {
  markdown: string;
  focused: boolean;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
};

const NoteArticle = ({ markdown, focused, setMarkdown, handleSave }: NoteArticleProps) => {
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

  return (
    <article className="h-[calc(100dvh-121px)] overflow-y-scroll border-r border-primary/10 bg-background pb-8 md:h-[calc(100dvh-109px)]">
      {focused ? (
        <TextareaAutosize
          className="min-h-full w-full resize-none appearance-none overflow-hidden hyphens-auto text-wrap break-words border-none bg-transparent px-8 py-6 text-sm leading-relaxed outline-none"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          autoFocus={focused}
          onFocus={moveCaretAtEnd}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <ReactMarkdown
          className={cn(
            "prose w-full max-w-full px-8 py-6",
            "prose-xs",
            "dark:prose-invert",
            "sm:prose-sm",
            "prose-p:hyphens-auto prose-p:text-wrap prose-p:break-words prose-em:text-yellow-600 prose-table:m-0 prose-table:text-xs prose-hr:my-4 prose-hr:border-primary/70 dark:prose-em:text-yellow-500",
          )}
          remarkPlugins={[remarkGfm]}
        >
          {markdown ? markdownToText(markdown) : "Nothing here yet... Use the button above to start writing."}
        </ReactMarkdown>
      )}
    </article>
  );
};
