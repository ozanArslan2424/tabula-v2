import { LibraryLink } from "@/components/buttons/link-btn";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <pre className="max-w-96 text-wrap break-words rounded-sm bg-primary px-8 py-4 text-muted-foreground">
        <span className="text-4xl font-bold text-foreground">404</span>
        <br />
        The book you were looking for is not here.
        <br />
        <br />
        <ul className="list-disc">
          <li key={1}>You may have deleted it.</li>
          <li key={2}>It could never have been created.</li>
          <li key={3}>It could belong to another user.</li>
        </ul>
        <br />
        <LibraryLink />
      </pre>
    </div>
  );
}
