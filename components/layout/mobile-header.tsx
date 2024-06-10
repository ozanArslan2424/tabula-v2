"use client";
import Button from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

type Props = {
    children: React.ReactNode;
};

export default function MobileHeader({ children }: Props) {
    return (
        <header className="flex h-[60px] w-full items-center justify-between border-b px-4 md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon_sm" variant="outline">
                        <MenuIcon size={14} />
                        <span className="sr-only">Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80vw] max-w-[80vw] p-0">
                    {children}
                </SheetContent>
            </Sheet>
            <Link href="/dash" className="text-lg font-bold">
                <h1 className="text-xl font-semibold capitalize">
                    Tabula Notes
                </h1>
            </Link>
        </header>
    );
}
