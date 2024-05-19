import BookItem from "@/components/core/book-item";
import { getAllBooks } from "@/lib/actions/read";

type Props = {
  userId: string;
};

export const BookList = async ({ userId }: Props) => {
  const books = await getAllBooks(userId);

  return (
    <div className="grid h-full w-full grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-4">
      {books.length !== 0 ? (
        books
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .map((book) => <BookItem key={book.id} book={book} />)
      ) : (
        <p className="grid min-h-36 w-full items-center justify-center rounded-md border bg-muted text-muted-foreground md:w-[360px]">
          No books yet...
        </p>
      )}
    </div>
  );
};
