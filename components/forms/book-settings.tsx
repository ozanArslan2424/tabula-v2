"use client";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/inputs/checkbox";
import Input from "@/components/ui/inputs/input";
import Label from "@/components/ui/label";
import { LoadingIcon } from "@/components/ui/loading";
import Message from "@/components/ui/message";
import { Textarea } from "@/components/ui/textarea";
import { updateBookSettings } from "@/lib/actions/update";
import { BookInfoType, BookType } from "@/lib/types";
import { BookSettingsSchema } from "@/lib/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

type Props = {
  book: BookInfoType | BookType;
  closeDialog: () => void;
};

export default function BookSettingsForm({ book, closeDialog }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof BookSettingsSchema>>({
    resolver: zodResolver(BookSettingsSchema),
    defaultValues: {
      bookId: book.id,
      title: book.title,
      description: book.description || "",
      hasTasks: book.hasTasks,
    },
  });

  const onSubmit = (values: z.infer<typeof BookSettingsSchema>) => {
    updateBookSettings(values).then((data) => {
      if (data?.error) {
        setError("root", { message: data.error });
      }
      if (data?.success) {
        closeDialog();
      }
    });
  };
  if (isSubmitting) return <LoadingIcon size={24} />;

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <Message variant="error">{errors.root.message}</Message>}

      <Label>
        <span>Book title</span>
        <Input {...register("title")} type="text" placeholder="Title" required />
        {errors.title && <Message variant="formerror">{errors.title.message}</Message>}
      </Label>

      <Label>
        <span>Book description</span>
        <Textarea {...register("description")} placeholder="Short description" />
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
