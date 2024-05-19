import CreateBookButton from "@/components/buttons/new-book-btn";
import { BookList } from "@/components/core/book-list";
import { DashMenu } from "@/components/layout/dash-menu";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function DashPage() {
  const { user } = await getSession();
  if (!user) {
    redirect("/login");
  }

  return (
    <div
      className={cn(
        "grid",
        "md:grid-cols-[20vw_80vw] md:grid-rows-[calc(100dvh-48px)]",
        "grid-cols-1 grid-rows-[60px_calc(100dvh-60px)]",
      )}
    >
      <DashMenu user={user} />

      <main className="overflow-x-hidden overflow-y-scroll md:col-start-2 md:col-end-3">
        <div className="flex h-[60px] items-center justify-between gap-2 border-b border-primary/10 bg-background px-6 py-2">
          <h1 className="text-2xl font-semibold tracking-tight">Library</h1>
          <CreateBookButton userId={user.id} />
        </div>
        <div className="p-4">
          <BookList userId={user.id} />
        </div>
      </main>
    </div>
  );
}
