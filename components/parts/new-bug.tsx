"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import Label from "@/components/ui/label";
import { LoadingIcon2 } from "@/components/ui/loading";
import Message from "@/components/ui/message";
import { Textarea } from "@/components/ui/textarea";

import { registerBug } from "@/lib/actions/admin.actions";
import { sendEmail } from "@/lib/actions/mail";
import { BugSchema } from "@/lib/types/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function BugForm({
    email,
    closeDialog,
}: {
    email: string;
    closeDialog: () => void;
}) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof BugSchema>>({
        resolver: zodResolver(BugSchema),
        defaultValues: {
            email: email,
        },
    });

    const onSubmit = (values: z.infer<typeof BugSchema>) => {
        registerBug(values);
        sendEmail({
            type: "bug",
            email: values.email,
            subject: values.subject,
            description: values.description,
        });
        closeDialog();
    };

    return (
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
                <Message variant="error">{errors.root.message}</Message>
            )}
            <Label>
                <span>Subject</span>
                <Input
                    {...register("subject")}
                    type="text"
                    disabled={isSubmitting}
                    required
                />
                {errors.subject && (
                    <Message variant="formerror">
                        {errors.subject.message}
                    </Message>
                )}
            </Label>

            <Label>
                <span>Description</span>
                <Textarea
                    {...register("description")}
                    disabled={isSubmitting}
                    required
                    placeholder="Hatanın detaylı açıklamasını yazın"
                />
                {errors.subject && (
                    <Message variant="formerror">
                        {errors.subject.message}
                    </Message>
                )}
            </Label>

            <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? <LoadingIcon2 /> : "Submit"}
            </Button>
        </form>
    );
}
