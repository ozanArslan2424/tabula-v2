"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import Label from "@/components/ui/label";
import { LoadingIcon } from "@/components/ui/loading";
import Message from "@/components/ui/message";
import { createNote } from "@/lib/actions/create";
import { NoteSchema } from "@/lib/types/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function NewNoteForm({ bookId }: { bookId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      bookId: bookId,
    },
  });

  const onSubmit = (values: z.infer<typeof NoteSchema>) => {
    startTransition(() => {
      createNote(values).then((data) => {
        if (data.error) {
          setError("root", { message: data.error });
        }
        if (data?.success) {
          setOpen(false);
          reset();
        }
      });
    });
  };

  return (
    <div
      className={cn(
        "h-dvh w-screen min-w-full snap-start border border-primary/10 md:w-96 md:min-w-96",
        open ? "bg-muted/20" : "hover:bg-muted/20",
      )}
    >
      {!open && !isPending ? (
        <Button className="h-full w-full" variant="unstyled" size="unsized" onClick={() => setOpen(true)}>
          <PlusCircleIcon className="shrink-0" size={20} />
        </Button>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col items-center justify-center gap-2 px-12"
        >
          {errors.root && <Message variant="error">{errors.root.message}</Message>}

          <Label>
            <span>Note title</span>
            <Input
              {...register("title")}
              className="w-full max-w-full"
              type="text"
              placeholder="..."
              disabled={isPending}
              autoFocus={open}
              required
            />
            {errors.title && <Message variant="formerror">{errors.title.message}</Message>}
          </Label>

          <Button disabled={isPending} type="submit" size="sm" className="mt-2 w-full">
            {isPending ? <LoadingIcon size={20} /> : "Create"}
          </Button>

          <Button
            disabled={isPending}
            type="reset"
            size="sm"
            className="w-full"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </form>
      )}
      {!open && isPending && <LoadingIcon size={20} />}
    </div>
  );
}
