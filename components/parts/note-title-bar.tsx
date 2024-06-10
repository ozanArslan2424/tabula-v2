import { deleteNote } from "@/lib/actions/delete";
import { updateNoteTitle } from "@/lib/actions/update";
import {
    DownloadIcon,
    EditIcon,
    SaveIcon,
    Trash2Icon,
    XIcon,
} from "lucide-react";
import { useState, useTransition } from "react";
import { SmallFormButtons } from "../forms/form-buttons";
import Button from "../ui/button";
import Input from "../ui/inputs/input";

type Props = {
    focused: boolean;
    note: {
        id: string;
        title: string;
        content: string | null;
        bookId: string;
        createdAt: Date;
    };
    markdown: string;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
    handleSave: () => void;
};

export default function NoteTitleBar({
    focused,
    note,
    markdown,
    setFocused,
    handleSave,
}: Props) {
    const [titleBarState, setTitleBarState] = useState<
        "default" | "editing" | "downloading" | "deleting"
    >("default");
    const [isPending, startTransition] = useTransition();
    const [noteTitle, setNoteTitle] = useState(note.title);

    function handleTitleChange(e: React.FormEvent) {
        e.preventDefault();
        updateNoteTitle(note.id, noteTitle);
        setTitleBarState("default");
    }

    function handleDownload(e: React.FormEvent) {
        e.preventDefault();
        const link = document.createElement("a");
        const file = new Blob([markdown], { type: "text/plain" });
        link.href = URL.createObjectURL(file);
        link.download = `${noteTitle}.md`;
        link.click();
        URL.revokeObjectURL(link.href);
        setTitleBarState("default");
    }

    function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        startTransition(() => {
            deleteNote(note.id, note.bookId);
        });
    }

    switch (titleBarState) {
        case "default":
            return (
                <hgroup className="grid max-h-[60px] max-w-[100vw] grid-cols-[auto_max-content] grid-rows-[60px] items-center gap-x-4 border-b px-2 md:max-w-[40vw] md:px-4">
                    <button
                        className="w-max rounded-md border border-transparent px-3 py-1.5 text-left transition-all hover:border-primary/10 hover:shadow-sm"
                        onClick={() => setTitleBarState("editing")}
                    >
                        <h2 className="truncate pr-4 text-xl font-semibold capitalize">
                            {noteTitle}
                        </h2>
                    </button>
                    {focused ? (
                        <div className="flex items-center justify-start gap-2">
                            <Button
                                className="text-danger"
                                variant="outline"
                                size="icon_sm"
                                onClick={() => setFocused(false)}
                            >
                                <span className="sr-only">
                                    Stop editing, don&apos;t save
                                </span>
                                <XIcon size={16} />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon_sm"
                                onClick={handleSave}
                            >
                                <span className="sr-only">Save note</span>
                                <SaveIcon size={16} />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-start gap-2">
                            <Button
                                variant="outline"
                                size="icon_sm"
                                onClick={() => setFocused(true)}
                            >
                                <span className="sr-only">
                                    Start editing note
                                </span>
                                <EditIcon size={16} />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon_sm"
                                className="transition-colors hover:text-accent"
                                onClick={() => setTitleBarState("downloading")}
                            >
                                <span className="sr-only">Download note</span>
                                <DownloadIcon size={16} />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon_sm"
                                className="transition-colors hover:bg-danger/50"
                                onClick={() => setTitleBarState("deleting")}
                            >
                                <span className="sr-only">Delete note</span>
                                <Trash2Icon size={16} />
                            </Button>
                        </div>
                    )}
                </hgroup>
            );

        case "editing":
            return (
                <form
                    onSubmit={handleTitleChange}
                    className="grid max-h-[60px] max-w-[100vw] grid-cols-[auto_max-content] grid-rows-[60px] items-center gap-x-4 border-b px-4 md:max-w-[40vw]"
                >
                    <Input
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        name="title"
                        id="title"
                        autoFocus
                        type="text"
                        className="text-sm font-semibold capitalize md:text-lg"
                    />
                    <SmallFormButtons
                        onCancel={() => setTitleBarState("default")}
                    />
                </form>
            );

        case "deleting":
            return (
                <form
                    onSubmit={handleDelete}
                    className="grid max-h-[60px] max-w-[100vw] grid-cols-[auto_max-content] grid-rows-[60px] items-center gap-x-4 border-b px-4 md:max-w-[40vw]"
                >
                    {isPending ? (
                        <>
                            <Trash2Icon
                                size={14}
                                className="animate-bounce text-danger"
                            />
                            <span className="text-sm font-semibold text-danger md:text-xs">
                                Deleting...
                            </span>
                        </>
                    ) : (
                        <>
                            <p>
                                <span className="md:text-md text-xs font-semibold">
                                    Are you sure you want to delete{" "}
                                    <span className="font-bold">
                                        &quot;{noteTitle}&quot;
                                    </span>
                                    ?
                                </span>{" "}
                                <span className="text-xs font-semibold text-danger md:text-sm">
                                    This action cannot be undone.
                                </span>
                            </p>
                            <SmallFormButtons
                                onCancel={() => setTitleBarState("default")}
                            />
                        </>
                    )}
                </form>
            );

        case "downloading":
            return (
                <form
                    onSubmit={handleDownload}
                    className="grid max-h-[60px] max-w-[100vw] grid-cols-[auto_max-content] grid-rows-[60px] items-center gap-x-4 border-b px-4 md:max-w-[40vw]"
                >
                    <p className="md:text-md text-xs font-semibold">
                        Are you sure you want to download &quot;{noteTitle}
                        &quot; as a markdown file?
                    </p>
                    <SmallFormButtons
                        onCancel={() => setTitleBarState("default")}
                    />
                </form>
            );

        default:
            break;
    }
}
