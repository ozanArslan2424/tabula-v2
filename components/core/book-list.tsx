"use client";
import BookItem from "@/components/core/book-item";
import { BookInfoType } from "@/lib/types";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import NewBookForm from "../forms/new-book";

type Props = {
  books: BookInfoType[];
  userId: string;
};

export const BookList = ({ books, userId }: Props) => {
  const [state, setState] = useState<"default" | "creating">("default");

  return (
    <div className="max-h-main h-main overflow-x-hidden overflow-y-scroll p-4">
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-4">
        {books.length !== 0 ? (
          books
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            .map((book) => <BookItem key={book.id} book={book} />)
        ) : (
          <p className="flex min-h-36 w-full items-center justify-center rounded-md border bg-muted text-muted-foreground md:w-[360px]">
            No books yet...
          </p>
        )}

        {state === "creating" ? (
          <div className="flex h-full min-h-[180px] w-full flex-col justify-between rounded-md border border-primary/60 text-left shadow transition-all">
            <NewBookForm closeDialog={() => setState("default")} userId={userId} />
          </div>
        ) : (
          <button
            onClick={() => setState("creating")}
            className="flex h-full min-h-[180px] items-center justify-center gap-4 rounded-md border p-4 transition-all hover:border-primary/60 hover:shadow active:border-primary/60 active:shadow"
          >
            <PlusCircleIcon size={24} className="shrink-0" />
            Create a new book
          </button>
        )}
      </div>
    </div>
  );
};
