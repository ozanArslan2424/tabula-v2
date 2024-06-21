import MobileHeader from "@/components/layout/mobile-header";

import DashSideMenu from "./_c/dash-side-menu";

import { getAllBooks, getQuicknotes } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";

import { redirect } from "next/navigation";
import { BookList } from "./_c/book-list";

export default async function DashPage() {
    const { user } = await getSession();
    if (!user) {
        redirect("/login");
    }
    const books = await getAllBooks(user.id);
    const quicknotes = await getQuicknotes(user.id);

    return (
        <div className="grid grid-cols-[100vw] grid-rows-[60px_calc(100dvh-60px)] md:max-h-[100dvh] md:max-w-[100vw] md:grid-cols-[20vw_80vw] md:grid-rows-[100dvh]">
            <div className="hidden md:block">
                <DashSideMenu userId={user.id} quicknotes={quicknotes} />
            </div>
            <MobileHeader>
                <DashSideMenu userId={user.id} quicknotes={quicknotes} />
            </MobileHeader>

            <main className="grid grid-cols-[100vw] grid-rows-[60px_calc(100dvh-120px)] md:max-h-[100dvh] md:max-w-[80vw] md:grid-cols-[80vw] md:grid-rows-[60px_calc(100dvh-60px)]">
                <div className="flex max-h-[60px] max-w-[100vw] items-center justify-between border-b px-4 md:max-w-[80vw]">
                    <h1 className="truncate pr-2 text-xl font-semibold capitalize">
                        Books
                    </h1>
                </div>
                <div className="max-h-[calc(100dvh-120px)] overflow-y-scroll p-4 md:max-h-[calc(100dvh-60px)]">
                    <BookList books={books} userId={user.id} />
                </div>
            </main>
        </div>
    );
}
