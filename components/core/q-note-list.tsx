"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import { LoadingIcon } from "@/components/ui/loading";
import { createQuicknote } from "@/lib/actions/create";
import { deleteQuicknote } from "@/lib/actions/delete";
import { QuicknoteType } from "@/lib/types";
import { QuicknoteSchema } from "@/lib/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  userId: string;
  quicknotes: QuicknoteType[];
};

export const QuicknoteList = ({ userId, quicknotes }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteQNote = (qNoteId: string) => {
    startTransition(() => {
      deleteQuicknote(qNoteId);
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof QuicknoteSchema>>({
    resolver: zodResolver(QuicknoteSchema),
    defaultValues: {
      userId: userId,
    },
  });

  const onSubmit = (values: z.infer<typeof QuicknoteSchema>) => {
    createQuicknote(values).then((data) => {
      if (data.success) {
        reset();
      }
      if (data.error) toast.error(data.error);
    });
  };
  return (
    <div className="space-y-1 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center gap-2 pb-2">
        <Input
          {...register("content")}
          placeholder="Type something..."
          type="text"
          autoComplete="off"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          size="icon"
          variant="outline"
          className="bg-background text-foreground"
          disabled={isSubmitting}
        >
          <span className="sr-only">Add quick note</span>
          <PlusCircleIcon size={14} className="shrink-0" />
        </Button>
      </form>
      {quicknotes.map((qNote) => (
        <div
          key={qNote.id}
          className="group flex w-full items-center justify-between gap-2 rounded-md border bg-background py-1 pl-3 pr-1"
        >
          <p className="hyphens-auto text-wrap break-words">{qNote.content}</p>
          <Button
            size="icon_sm"
            variant="outline"
            className="text-danger opacity-25 transition-opacity group-hover:opacity-100"
            onClick={() => handleDeleteQNote(qNote.id)}
          >
            {isPending ? <LoadingIcon /> : <Trash2Icon size={14} className="shrink-0" />}
          </Button>
        </div>
      ))}
    </div>
  );
};
