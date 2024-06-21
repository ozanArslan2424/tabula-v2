import { NoteType } from "@/lib/types";

type Props = {
    note: NoteType;
};

export const CodeBlock = ({ note }: Props) => {
    return (
        <div className="prose-xs prose rounded-md border shadow-sm dark:prose-invert md:prose-sm">
            <pre>
                <code>{note.content}</code>
            </pre>
        </div>
    );
};
