"use client";
import Button from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/lib/hooks/use-media";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function MobileHeader({ children }: Props) {
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  if (isMobileScreen)
    return (
      <header className="title-bar bg-secondary/50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon_sm">
              <HamburgerMenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="max-h-screen w-max p-0">
            <div className="title-bar bg-secondary/50">
              <Link href="/dash" className="text-xl font-bold">
                Tabula
              </Link>
            </div>
            {children}
          </SheetContent>
        </Sheet>
        <Link href="/dash" className="text-lg font-bold">
          Tabula Notes
        </Link>
      </header>
    );

  return <aside className="h-dvh min-h-dvh w-menu border-r border-primary/10">{children}</aside>;
}
