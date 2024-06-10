import { NewBookForm } from "@/components/forms/new-book";
import MobileHeader from "@/components/layout/mobile-header";
import BookItem from "@/components/parts/book-item";
import DashSideMenu from "@/components/parts/dash-side-menu";
import { getAllBooks, getQuicknotes } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashPage() {
    const { user } = await getSession();
    if (!user) {
        redirect("/login");
    }
    const books = await getAllBooks(user.id);
    const quicknotes = await getQuicknotes(user.id);

    return (
        <div
            className={`
                grid 
                grid-cols-[100vw] grid-rows-[60px_calc(100dvh-60px)] md:max-h-[100dvh] md:max-w-[100vw] 
                md:grid-cols-[20vw_80vw] md:grid-rows-[100dvh] 
                `}
        >
            <div className="hidden md:block">
                <DashSideMenu userId={user.id} quicknotes={quicknotes} />
            </div>
            <MobileHeader>
                <DashSideMenu userId={user.id} quicknotes={quicknotes} />
            </MobileHeader>

            <main
                className={`
            grid 
            grid-cols-[100vw] grid-rows-[60px_calc(100dvh-120px)] md:max-h-[100dvh] md:max-w-[80vw] 
            md:grid-cols-[80vw] md:grid-rows-[60px_calc(100dvh-60px)]
            `}
            >
                <div
                    className={`
                    flex max-h-[60px] max-w-[100vw] items-center justify-between border-b px-4 
                    md:max-w-[80vw]
                    `}
                >
                    <h1 className="truncate pr-2 text-xl font-semibold capitalize">
                        Books
                    </h1>
                </div>
                <div
                    className={`
                    max-h-[calc(100dvh-120px)] overflow-y-scroll p-4 
                    md:max-h-[calc(100dvh-60px)]
                    `}
                >
                    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-4">
                        {books.length !== 0 ? (
                            books
                                .sort(
                                    (a, b) =>
                                        a.createdAt.getTime() -
                                        b.createdAt.getTime(),
                                )
                                .map((book) => (
                                    <BookItem key={book.id} book={book} />
                                ))
                        ) : (
                            <p className="flex min-h-36 w-full items-center justify-center rounded-md border bg-muted text-muted-foreground md:w-[360px]">
                                No books yet...
                            </p>
                        )}
                        <NewBookForm userId={user.id} />
                    </div>
                </div>
            </main>
        </div>
    );
}
