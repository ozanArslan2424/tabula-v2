"use client";
import Button from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";
import { MoonIcon, SunDimIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted)
        return (
            <Button variant="outline" size="icon_sm" className="bg-background" disabled>
                <LoadingIcon />
            </Button>
        );

    return (
        <Button variant="outline" size="icon_sm" className="bg-background" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
            {resolvedTheme === "light" ? (
                <div className="flex items-center gap-2">
                    <MoonIcon size={14} />
                    <span className="sr-only">Dark Mode</span>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <SunDimIcon size={14} />
                    <span className="sr-only">Light Mode</span>
                </div>
            )}
        </Button>
    );
}
