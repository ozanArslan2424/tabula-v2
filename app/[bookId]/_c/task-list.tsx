"use client";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/inputs/checkbox";
import Input from "@/components/ui/inputs/input";
import { LoadingIcon } from "@/components/ui/loading";

import { createTask } from "@/lib/actions/create";
import { deleteTask } from "@/lib/actions/delete";
import { updateTask } from "@/lib/actions/update";
import { TaskType } from "@/lib/types";

import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

type ListProps = {
    userId: string;
    bookId: string;
    tasks: TaskType[];
};

type ItemProps = {
    bookId: string;
    task: TaskType;
    setTaskArray: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export default function TaskList({ tasks, bookId, userId }: ListProps) {
    const [taskName, setTaskName] = useState<string>("");
    const [taskArray, setTaskArray] = useState(tasks);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskName) {
            createTask(taskName, bookId, userId).then((res) => {
                if (res.success) {
                    setTaskArray([...taskArray, res.data]);
                }
            });
            setTaskName("");
        }
    };

    return (
        <div className="space-y-2 px-4">
            <form
                className="flex items-center justify-start gap-2"
                onSubmit={handleAddTask}
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
                {taskArray.map((task, i) => (
                    <TaskItem
                        key={i}
                        task={task}
                        bookId={bookId}
                        setTaskArray={setTaskArray}
                    />
                ))}
            </div>
        </div>
    );
}

const TaskItem = ({ task, bookId, setTaskArray }: ItemProps) => {
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
            deleteTask(taskId, bookId).then((res) => {
                if (res.success) {
                    setTaskArray((prev) =>
                        prev.filter((task) => task.id !== taskId),
                    );
                }
            });
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
