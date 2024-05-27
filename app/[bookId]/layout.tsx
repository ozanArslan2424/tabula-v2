import { BookMenu } from "@/components/layout/book-menu";
import MobileHeader from "@/components/layout/mobile-header";
import { getBookList, getCurrentBook } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  params: { bookId },
  children,
}: Readonly<{
  params: {
    bookId: string;
  };
  children: React.ReactNode;
}>) {
  const { user } = await getSession();
  if (!user) redirect("/login");
  const currentBook = await getCurrentBook(bookId);
  if (!currentBook) return <p>Book Not Found</p>;
  const bookList = await getBookList(user.id);
  return (
    <div className="flex h-dvh max-h-dvh min-h-dvh w-screen min-w-screen max-w-screen flex-col md:flex-row">
      <MobileHeader>
        <BookMenu user={user} currentBook={currentBook} bookList={bookList} />
      </MobileHeader>
      <main className="h-main max-h-main w-screen min-w-screen overflow-hidden md:h-screen md:max-h-screen md:w-main md:min-w-main">
        {children}
      </main>
    </div>
  );
}
