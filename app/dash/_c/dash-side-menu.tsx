import Button from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";

import { QuicknoteList } from "./q-note-list";

import { UserCogIcon } from "lucide-react";
import Link from "next/link";

type Props = {
    userId: string;
    quicknotes: {
        id: string;
        userId: string;
        content: string;
    }[];
};

export default function DashSideMenu({ userId, quicknotes }: Props) {
    return (
        <aside className="grid max-h-[100dvh] max-w-[80vw] grid-cols-[80vw] grid-rows-[60px_60px_calc(100dvh-140px)_20px] border-r md:max-w-[20vw] md:grid-cols-[20vw]">
            <div className="grid max-h-[60px] max-w-[80vw] grid-cols-[auto_max-content] grid-rows-[60px] items-center border-b px-4 md:max-w-[20vw]">
                <h1 className="truncate pr-2 text-xl font-semibold capitalize">
                    Library
                </h1>
            </div>
            <div className="flex max-h-[60px] items-center justify-start gap-2 border-b px-4">
                <Link href="/settings" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                        <UserCogIcon size={14} />
                        <span>User settings</span>
                    </Button>
                </Link>
                <ThemeToggle />
            </div>

            <div className="max-h-[calc(100dvh-140px)] max-w-[80vw] overflow-y-scroll md:max-w-[20vw]">
                <div className="py-4">
                    <h1 className="px-6 pb-2 text-lg font-medium">
                        Quicknotes
                    </h1>
                    <QuicknoteList userId={userId} quicknotes={quicknotes} />
                </div>
            </div>
            <div className="max-h-[20px] max-w-[80vw] md:max-w-[20vw]"></div>
        </aside>
    );
}
