"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import Message from "@/components/ui/message";
import { sendEmail } from "@/lib/actions/mail";
import { EmailSchema } from "@/lib/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RequestInviteForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
    });

    const onSubmit = (values: z.infer<typeof EmailSchema>) => {
        sendEmail({
            type: "request",
            email: values.email,
        });
    };

    return (
        <>
            <form className="flex space-x-2" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1"
                    required
                />
                <Button type="submit">Request Access</Button>
            </form>
            {errors.email && (
                <Message variant="formerror">{errors.email.message}</Message>
            )}
            {errors.root && (
                <Message variant="error">{errors.root.message}</Message>
            )}
        </>
    );
}
