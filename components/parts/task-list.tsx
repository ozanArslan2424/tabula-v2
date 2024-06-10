"use client";
import { createTask } from "@/lib/actions/create";
import { deleteTask } from "@/lib/actions/delete";
import { updateTask } from "@/lib/actions/update";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import Button from "../ui/button";
import Checkbox from "../ui/inputs/checkbox";
import Input from "../ui/inputs/input";
import { LoadingIcon } from "../ui/loading";

type ListProps = {
    userId: string;
    bookId: string;
    tasks: {
        id: string;
        name: string;
        completed: boolean;
        bookId: string;
        userId: string;
    }[];
};

type ItemProps = {
    bookId: string;
    task: {
        id: string;
        name: string;
        completed: boolean;
        bookId: string;
        userId: string;
    };
};

export default function TaskList({ tasks, bookId, userId }: ListProps) {
    const [taskName, setTaskName] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskName) {
            createTask(taskName, bookId, userId);
            setTaskName("");
        }
    };

    return (
        <div className="space-y-2 px-4">
            <form
                className="flex items-center justify-start gap-2"
                onSubmit={handleSubmit}
            >
                <Input
                    placeholder="Add task..."
                    type="text"
                    autoComplete="off"
                    className="h-8 max-h-8"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <Button
                    type="submit"
                    size="icon_sm"
                    variant="outline"
                    className="bg-background text-foreground"
                >
                    <span className="sr-only">Add task</span>
                    <PlusCircleIcon size={14} className="shrink-0" />
                </Button>
            </form>
            <div className="flex flex-col gap-1">
                {tasks.map((task, i) => (
                    <TaskItem key={i} task={task} bookId={bookId} />
                ))}
            </div>
        </div>
    );
}

const TaskItem = ({ task, bookId }: ItemProps) => {
    const [completed, setCompleted] = useState<boolean>(task.completed);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const timer = setTimeout(() => {
            updateTask(task.id, completed);
        }, 2000);

        return () => clearTimeout(timer);
    }, [completed, task.id]);

    const handleDeleteTask = (taskId: string) => {
        startTransition(() => {
            deleteTask(taskId, bookId);
        });
    };

    return (
        <div className="group relative line-clamp-2 flex w-full items-center justify-start gap-4 rounded-md px-2 py-1 text-sm capitalize hover:bg-secondary">
            <Checkbox
                className="group group-hover:scale-[1.01]"
                disabled={isPending}
                defaultChecked={completed}
                onChange={() => setCompleted(!completed)}
            >
                <span className="group-data-[state=checked]:line-through">
                    {task.name}
                </span>
            </Checkbox>

            <Button
                size="icon_sm"
                variant="outline"
                className="text-danger opacity-25 transition-opacity group-hover:opacity-100"
                onClick={() => handleDeleteTask(task.id)}
            >
                {isPending ? (
                    <LoadingIcon />
                ) : (
                    <Trash2Icon size={14} className="shrink-0" />
                )}
            </Button>
        </div>
    );
};
