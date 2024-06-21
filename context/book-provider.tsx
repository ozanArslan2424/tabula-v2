"use client";
import { BookType } from "@/lib/types";
import { createContext, useContext } from "react";

export const BookContext = createContext<BookType | null>(null);

export const useBookContext = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error("useBookContext must be used within a BookProvider");
    }
    return context;
};

export const BookProvider = ({
    children,
    book,
}: {
    children: React.ReactNode;
    book: BookType;
}) => {
    return <BookContext.Provider value={book}>{children}</BookContext.Provider>;
};
