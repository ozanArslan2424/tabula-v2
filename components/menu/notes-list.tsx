import { toSnakeCase } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  notes: { title: string; createdAt: Date }[];
};

export const NotesList = ({ notes }: Props) => {
  return (
    <div className="flex flex-col gap-1 p-4">
      <h3 className="text-lg font-semibold">Note titles</h3>
      {notes
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map((note) => (
          <Link
            href={`#${toSnakeCase(note.title)}`}
            key={note.title}
            className="group relative flex w-full items-center justify-start gap-4 truncate rounded-sm px-2 py-1 text-sm capitalize hover:bg-secondary"
          >
            <ChevronRight className="transition-transform group-hover:translate-x-2" size={14} />
            {note.title}
          </Link>
        ))}
    </div>
  );
};
