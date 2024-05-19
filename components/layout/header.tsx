import UserButton from "@/components/layout/user-btn";
import ThemeToggle from "@/components/ui/theme-toggle";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export const Header = async () => {
  const { user } = await getSession();
  return (
    <header className="hidden h-12 min-h-12 items-center justify-between border-b border-primary/10 bg-secondary/50 px-4 text-secondary-foreground md:flex md:px-6">
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
