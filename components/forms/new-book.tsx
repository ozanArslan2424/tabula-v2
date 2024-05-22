"use client";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/inputs/checkbox";
import Input from "@/components/ui/inputs/input";
import Label from "@/components/ui/label";
import Message from "@/components/ui/message";
import { Textarea } from "@/components/ui/textarea";
import { createBook } from "@/lib/actions/create";
import { BookSchema } from "@/lib/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  userId: string;
  closeDialog: () => void;
};

export default function NewBookForm({ userId, closeDialog }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      userId: userId,
      hasTasks: false,
    },
  });

  function onSubmit(values: z.infer<typeof BookSchema>) {
    createBook(values).then((data) => {
      if (data.error) {
        setError("root", { message: data.error });
      } else {
        closeDialog();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
      {errors.root && <Message variant="error">{errors.root.message}</Message>}

      <Label>
        <span>Book title</span>
        <Input {...register("title")} type="text" placeholder="Başlık" required />
        {errors.title && <Message variant="formerror">{errors.title.message}</Message>}
      </Label>

      <Label>
        <span>Book description</span>
        <Textarea {...register("description")} placeholder="Kısa bir açıklama" className="resize-none" />
      </Label>

      <div className="flex items-center gap-2">
        <Checkbox {...register("hasTasks")}>
          <span>Task list</span>
        </Checkbox>

        <Button size="sm" variant="secondary" onClick={closeDialog}>
          Cancel
        </Button>

        <Button type="submit" size="sm">
          Save
        </Button>
      </div>
    </form>
  );
}
