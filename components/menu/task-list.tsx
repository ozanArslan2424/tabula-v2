"use client";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/inputs/checkbox";
import Input from "@/components/ui/inputs/input";
import { LoadingIcon } from "@/components/ui/loading";
import { createTask } from "@/lib/actions/create";
import { deleteTask } from "@/lib/actions/delete";
import { updateTask } from "@/lib/actions/update";
import { TaskType } from "@/lib/types";
import { TaskSchema } from "@/lib/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Message from "../ui/message";

type Props = {
  userId: string;
  bookId: string;
  tasks: TaskType[];
};

export const TaskList = ({ userId, bookId, tasks }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      bookId: bookId,
      userId: userId,
    },
  });

  const onSubmit = (values: z.infer<typeof TaskSchema>) => {
    createTask(values).then((data) => {
      if (data.success) {
        reset();
      }
      if (data.error) setError("root", { message: data.error });
    });
  };

  return (
    <div className="flex flex-col gap-1 p-4">
      <h2 className="text-lg font-bold">Tasks</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center gap-2 py-2">
        <Input {...register("name")} placeholder="Add task..." type="text" autoComplete="off" disabled={isSubmitting} />

        <Button
          type="submit"
          size="icon"
          variant="outline"
          className="bg-background text-foreground"
          disabled={isSubmitting}
        >
          <span className="sr-only">Add task</span>
          <PlusCircleIcon size={14} className="shrink-0" />
        </Button>
      </form>
      {errors.root && <Message variant="formerror">{errors.root.message}</Message>}

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} bookId={bookId} />
      ))}
    </div>
  );
};

const TaskItem = ({ task, bookId }: { task: TaskType; bookId: string }) => {
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
    <div className="group flex w-full items-center justify-between gap-2 rounded-md border bg-background py-1 pl-3 pr-1">
      <Checkbox
        className="group"
        disabled={isPending}
        defaultChecked={completed}
        onChange={() => setCompleted(!completed)}
      >
        <span className="group-data-[state=checked]:line-through">{task.name}</span>
      </Checkbox>

      <Button
        size="icon_sm"
        variant="outline"
        className="text-danger opacity-25 transition-opacity group-hover:opacity-100"
        onClick={() => handleDeleteTask(task.id)}
      >
        {isPending ? <LoadingIcon /> : <Trash2Icon size={14} className="shrink-0" />}
      </Button>
    </div>
  );
};
