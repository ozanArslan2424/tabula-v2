import { cn } from "@/lib/utils";
import Link from "next/link";

const linkClasses =
    "w-full h-9 min-w-16 px-3 py-2 text-sm gap-2 rounded-md inline-flex font-medium focus:outline-none focus:ring-2 ring-ring items-center justify-center disabled:opacity-50 disabled:pointer-events-none hover:opacity-90 active:scale-[.98] focus-visible:ring-2 transition-all";

export const LibraryLink = () => {
    return (
        <Link
            href="/dash"
            className={cn(
                linkClasses,
                "border bg-transparent text-foreground hover:bg-muted hover:shadow-sm",
            )}
        >
            &#x2190; Back to library
        </Link>
    );
};

export const AdminLink = () => {
    return (
        <Link
            href="/admin"
            className={cn(
                linkClasses,
                "bg-accent text-accent-foreground shadow-sm",
            )}
        >
            To admin panel &#x2192;
        </Link>
    );
};

export const LandingPageLink = () => {
    return (
        <Link
            href="/"
            className={cn(
                linkClasses,
                "border-primary text-foreground shadow-sm",
            )}
        >
            &#x2190; Go to landing page
        </Link>
    );
};
