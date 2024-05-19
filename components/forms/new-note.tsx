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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function NewNoteForm({ bookId }: { bookId: string }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      bookId: bookId,
    },
  });

  const onSubmit = (values: z.infer<typeof NoteSchema>) => {
    createNote(values).then((data) => {
      if (data.error) {
        setError("root", { message: data.error });
      }
      if (data?.success) {
        toast.success(data?.success);
        setOpen(false);
        reset();
      }
    });
  };

  return (
    <div
      className={cn("w-screen min-w-full snap-start md:w-96 md:min-w-96", open ? "bg-muted/20" : "hover:bg-muted/20")}
    >
      {!open && !isSubmitting ? (
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
              disabled={isSubmitting}
              autoFocus={open}
              required
            />
            {errors.title && <Message variant="formerror">{errors.title.message}</Message>}
          </Label>

          <Button disabled={isSubmitting} type="submit" size="sm" className="mt-2 w-full">
            Create
          </Button>

          <Button
            disabled={isSubmitting}
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
      {!open && isSubmitting && <LoadingIcon size={20} />}
    </div>
  );
}
