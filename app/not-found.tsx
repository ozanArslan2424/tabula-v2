import { LibraryLink } from "@/components/parts/link-btn";

export default function NotFoundPage() {
    return (
        <div className="grainy flex h-screen w-full flex-col items-center justify-center gap-4">
            <pre className="max-w-96 hyphens-auto text-wrap break-words rounded-sm bg-secondary px-8 py-4 text-secondary-foreground/70">
                <span className="text-4xl font-bold text-secondary-foreground">
                    404
                </span>
                <br />
                I don&apos;t know what you were looking for but it&apos;s not
                here.
                <br />
                <br />
                <LibraryLink />
            </pre>
        </div>
    );
}
