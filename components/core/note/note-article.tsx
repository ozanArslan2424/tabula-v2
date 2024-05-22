"use client";
import { cn, markdownToText } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
// import { remarkMark } from "remark-mark-highlight";
// import MarkdownPreview from "@uiw/react-markdown-preview";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type NoteArticleProps = {
  markdown: string;
  focused: boolean;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
};

export const NoteArticle = ({ markdown, focused, setMarkdown, handleSave }: NoteArticleProps) => {
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
    <article className="bg-background">
      {focused ? (
        <TextareaAutosize
          className="h-main min-h-main max-h-main min-w-note w-full resize-none appearance-none overflow-y-scroll hyphens-auto text-wrap break-words border-none bg-transparent px-6 pb-16 pt-2 text-sm leading-relaxed outline-none"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          autoFocus={focused}
          onFocus={moveCaretAtEnd}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <ReactMarkdown
          className={cn(
            "h-main min-h-main max-h-main min-w-screen max-w-screen md:min-w-note md:max-w-note w-full overflow-y-scroll bg-transparent px-6 pb-16 pt-2",
            "prose-xs prose dark:prose-invert sm:prose-sm prose-p:hyphens-auto prose-p:text-wrap prose-p:break-words prose-em:text-yellow-600 prose-table:m-0 prose-table:text-xs prose-hr:my-4 prose-hr:border-primary/70 dark:prose-em:text-yellow-500",
          )}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {markdown ? markdownToText(markdown) : "Nothing here yet... Use the button above to start writing."}
        </ReactMarkdown>
      )}
    </article>
  );
};
