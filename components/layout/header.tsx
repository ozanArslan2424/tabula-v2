import ThemeToggle from "@/components/ui/theme-toggle";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import UserButton from "./user-btn";

export const Header = async () => {
  const { user } = await getSession();
  return (
    <header className="flex h-12 min-h-12 items-center justify-between border-b border-primary/10 bg-secondary/50 px-4 text-secondary-foreground md:px-6">
      <Link href="/dash" className="text-xl font-bold">
        Tabula Notes
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserButton user={user} />
      </div>
    </header>
  );
};
