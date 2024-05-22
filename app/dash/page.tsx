import { BookList } from "@/components/core/book-list";
import MobileHeader from "@/components/layout/mobile-header";
import UserButton from "@/components/layout/user-btn";
import { QuicknoteList } from "@/components/menu/q-note-list";
import ThemeToggle from "@/components/ui/theme-toggle";
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
    <div className="flex h-full flex-col md:flex-row">
      <MobileHeader>
        <div className="title-bar">
          <h1 className="h1">Menu</h1>
        </div>

        <div className="max-h-main h-main overflow-x-hidden overflow-y-scroll">
          <div className="flex gap-2 border-b border-primary/10 px-4 py-2">
            <ThemeToggle />
            <UserButton user={user} />
          </div>
          <QuicknoteList userId={user.id} quicknotes={quicknotes} />
        </div>
      </MobileHeader>

      <main className="h-dvh max-h-dvh w-full">
        <div className="title-bar">
          <h1 className="h1">Library</h1>
        </div>
        <BookList userId={user.id} books={books} />
      </main>
    </div>
  );
}
