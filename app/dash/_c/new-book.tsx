"use client";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/inputs/checkbox";
import Input from "@/components/ui/inputs/input";
import Select from "@/components/ui/inputs/select";
import Label from "@/components/ui/label";
import Message from "@/components/ui/message";
import { Textarea } from "@/components/ui/textarea";

import { createBook } from "@/lib/actions/create";
import { BookInfoType } from "@/lib/types";
import { BookSchema } from "@/lib/types/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
    userId: string;
    setBookArray: React.Dispatch<React.SetStateAction<BookInfoType[]>>;
};

const NewBookForm = ({ userId, setBookArray }: Props) => {
    const [state, setState] = useState<"default" | "creating">("default");

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof BookSchema>>({
        resolver: zodResolver(BookSchema),
        defaultValues: {
            userId: userId,
            hasTasks: false,
            type: "notebook",
        },
    });

    function onSubmit(values: z.infer<typeof BookSchema>) {
        createBook(values).then((res) => {
            if (res.error) {
                setError("root", { message: res.error });
            }
            if (res.success) {
                setState("default");
                setBookArray((prev) => [...prev, res.data]);
            }
        });
    }

    function closeDialog() {
        reset();
        setState("default");
    }

    if (state === "creating") {
        return (
            <div className="flex h-full min-h-[180px] w-full flex-col justify-between rounded-md border border-primary/60 text-left shadow transition-all">
                {/* <NewBookForm closeDialog={() => setState("default")} userId={userId} /> */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full space-y-4 p-4"
                >
                    {errors.root && (
                        <Message variant="error">{errors.root.message}</Message>
                    )}

                    <Label>
                        <span>Book title</span>
                        <Input
                            {...register("title")}
                            type="text"
                            placeholder="Başlık"
                            required
                        />
                        {errors.title && (
                            <Message variant="formerror">
                                {errors.title.message}
                            </Message>
                        )}
                    </Label>

                    <Label>
                        <span>Book description</span>
                        <Textarea
                            {...register("description")}
                            placeholder="Kısa bir açıklama"
                            className="resize-none"
                        />
                    </Label>

                    <Label>
                        <span>Type of book</span>
                        <Select {...register("type")}>
                            <option value="notebook">Notes</option>
                            <option value="codebook">Code</option>
                            <option value="pdf">PDF</option>
                        </Select>
                    </Label>

                    <div className="flex items-center gap-2">
                        <Checkbox {...register("hasTasks")}>
                            <span>Task list</span>
                        </Checkbox>

                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={closeDialog}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" size="sm">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        );
    } else {
        return (
            <button
                onClick={() => setState("creating")}
                className="flex h-full min-h-[180px] items-center justify-center gap-4 rounded-md border p-4 transition-all hover:border-primary/60 hover:shadow active:border-primary/60 active:shadow"
            >
                <PlusCircleIcon size={24} className="shrink-0" />
                Create a new book
            </button>
        );
    }
};

export default NewBookForm;
