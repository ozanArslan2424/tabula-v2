"use client";

import Input from "@/components/ui/inputs/input";
import { toTitleCase } from "@/lib/utils";
import { useState } from "react";

export default function TestPage() {
    const [input, setInput] = useState("");
    return (
        <div className="h-screen w-full bg-slate-400">
            <div className="container w-full p-32">
                <Input
                    className="max-w-96"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                />
                <div className="mt-8 max-w-96 rounded-xl border border-dashed p-4">
                    <p>{toTitleCase(input)}</p>
                </div>
            </div>
        </div>
    );
}
