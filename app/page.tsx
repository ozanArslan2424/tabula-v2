import RequestInviteForm from "@/components/forms/req-invite";
import { Header } from "@/components/layout/header";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full border-b py-12 md:py-24 lg:py-32">
          <div className="space-y-10 px-4 md:px-6 xl:space-y-16">
            <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Take notes <br /> <i>naturally,</i>
                  <br /> sync across devices
                </h1>
              </div>
              <div className="flex flex-col items-start space-y-6">
                <h2>
                  <span className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                    A note-taking app for everyone
                  </span>
                </h2>
                <p className="mx-auto max-w-[700px] text-foreground md:text-lg">
                  Tabula Notes is a note-taking app designed to help you stay organized and productive across all your
                  devices.
                  <br /> Take a look at{" "}
                  <Link className="underline underline-offset-[5px]" href="https://ozanarslan.vercel.app">
                    my portfolio
                  </Link>{" "}
                  for my other projects
                </p>

                <Button>
                  <Link href="/dash">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful note-taking tools</h2>
                <p className="max-w-[900px] text-foreground  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tabula Notes offers a suite of features to help you capture, organize, and access your notes with
                  ease.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Cross-device Sync</h3>
                <p className="text-sm text-foreground">
                  Access your notes from anywhere, on any device. Tabula Notes automatically syncs your data across all
                  your devices through your account.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Markdown based Editing</h3>
                <p className="text-sm text-foreground">
                  Write notes in universal Markdown format. Tabula Notes renders your notes beautifully.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Powerful Organization</h3>
                <p className="text-sm text-foreground">
                  Organize your notes with notebooks, and horizontal scrolling just like a real notebook. Find your
                  notes with ease, using the navigation menus.
                </p>
              </div>

              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Secure</h3>
                <p className="text-sm text-foreground">
                  Your notes are stored securely. Tabula Notes respects your privacy and never shares your data.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Code snippets</h3>
                <p className="text-sm text-foreground">
                  Write and store code snippets in special code books. Tabula Notes supports syntax highlighting. Your
                  snippets have never looked more beautiful.
                  <br />
                  <i className="text-muted-foreground">Currently being implemented.</i>
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Collaboration</h3>
                <p className="text-sm text-foreground">
                  Share notes with your team and collaborate in real-time. Manage permissions and track changes.
                  <br />
                  <i className="text-muted-foreground">Currently being implemented.</i>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-secondary md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Tabula Notes: The ultimate note-taking companion
              </h2>
              <p className="mx-auto max-w-[600px] text-foreground  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Capture your ideas, organize your thoughts, and access your notes from anywhere with Tabula Notes.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <RequestInviteForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-foreground">2024, Tabula Notes.</p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="ozanarslan.vercel.app">
            Ozan Arslan
          </Link>
        </nav>
      </footer>
    </div>
  );
}
