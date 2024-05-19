"use client";
import UserButton from "@/components/layout/user-btn";
import Button from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useMediaQuery } from "@/lib/hooks/use-media";
import { UserType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Props = {
  user: UserType;
  children: React.ReactNode;
};

export default function MobileHeader({ user, children }: Props) {
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  if (isMobileScreen)
    return (
      <header
        className={cn(
          "row-start-1 row-end-2",
          "h-[60px] w-full border-b border-primary/10 bg-secondary/50 px-4 text-secondary-foreground",
          "flex items-center justify-between",
        )}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon_sm">
              <HamburgerMenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80vw] overflow-y-scroll p-0">
            <div className="overflow-y-scroll">
              <div className="w-full border-b border-primary/10 bg-secondary/50 p-4">
                <Link href="/dash" className="text-xl font-bold">
                  Tabula
                </Link>
              </div>
              {children}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserButton user={user} />
        </div>
      </header>
    );

  return (
    <aside
      className={cn(
        "col-start-1 col-end-2",
        "overflow-y-scroll border-r border-primary/10 bg-secondary/50 text-secondary-foreground",
      )}
    >
      {children}
    </aside>
  );
}
