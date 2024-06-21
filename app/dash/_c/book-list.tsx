"use client";
import { BookInfoType } from "@/lib/types";
import { useState } from "react";
import BookItem from "./book-item";
import NewBookForm from "./new-book";

type ListProps = {
    userId: string;
    books: BookInfoType[];
};

export const BookList = ({ books, userId }: ListProps) => {
    const [bookArray, setBookArray] = useState(books);

    return (
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-4">
            {bookArray.length !== 0 ? (
                bookArray
                    .sort(
                        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                    )
                    .map((book) => (
                        <BookItem
                            key={book.id}
                            book={book}
                            setBookArray={setBookArray}
                        />
                    ))
            ) : (
                <p className="flex min-h-36 w-full items-center justify-center rounded-md border bg-muted text-muted-foreground md:w-[360px]">
                    No books yet...
                </p>
            )}
            <NewBookForm userId={userId} setBookArray={setBookArray} />
        </div>
    );
};
