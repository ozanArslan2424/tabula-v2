import { BookTextIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  otherBooks: { id: string; title: string }[];
  currentBookId: string;
};

export const OtherBooksList = ({ otherBooks, currentBookId }: Props) => {
  return (
    <div className="flex flex-col gap-1 p-4">
      <h3 className="text-lg font-semibold">Other books</h3>
      {otherBooks
        .filter((book) => book.id !== currentBookId)
        .map((book) => {
          return (
            <Link
              href={`/${book.id}`}
              key={book.id}
              className="group flex w-full items-center justify-start gap-4 truncate rounded-sm px-2 py-1 text-sm capitalize hover:bg-secondary"
            >
              <BookTextIcon
                size={14}
                className="transition-transform group-hover:translate-x-1 group-hover:rotate-3 group-hover:scale-125"
              />
              {book.title}
            </Link>
          );
        })}
    </div>
  );
};
