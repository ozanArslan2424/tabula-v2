import MobileHeader from "@/components/layout/mobile-header";

import BookSideMenu from "./_c/book-side-menu";

import { getBookContent, getBookList } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";

import { redirect } from "next/navigation";
import { BookProvider } from "../../context/book-provider";

export default async function RootLayout({
    params: { bookId },
    children,
}: {
    params: {
        bookId: string;
    };
    children: React.ReactNode;
}) {
    const { user } = await getSession();

    if (!user) redirect("/login");

    const currentBook = await getBookContent(bookId);

    if (!currentBook || currentBook.userId !== user.id) redirect("/dash");

    const bookList = await getBookList(user.id);

    return (
        <div className="grid max-h-[100dvh] max-w-[100vw] grid-cols-[100vw] grid-rows-[60px_calc(100dvh-60px)] md:grid-cols-[20vw_80vw] md:grid-rows-[100dvh]">
            <div className="hidden md:block">
                <BookSideMenu
                    userId={user.id}
                    currentBook={currentBook}
                    bookList={bookList}
                />
            </div>

            <MobileHeader>
                <BookSideMenu
                    userId={user.id}
                    currentBook={currentBook}
                    bookList={bookList}
                />
            </MobileHeader>

            <BookProvider book={currentBook}>{children}</BookProvider>
        </div>
    );
}
