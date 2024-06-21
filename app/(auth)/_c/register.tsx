"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import PasswordInput from "@/components/ui/inputs/password-input";
import Label from "@/components/ui/label";
import { LoadingIcon2 } from "@/components/ui/loading";
import Message from "@/components/ui/message";

import { registerAction } from "@/lib/actions/auth.actions";
import { RegisterSchema } from "@/lib/types/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterForm({ email }: { email: string }) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: email,
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        registerAction(values).then((data) => {
            if (data.error) setError("root", { message: data.error });
        });
    };

    return (
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
                <Message variant="error">{errors.root.message}</Message>
            )}
            <Label>
                <span>Username</span>
                <Input
                    {...register("username")}
                    type="text"
                    placeholder="rasa"
                    disabled={isSubmitting}
                    required
                />
                {errors.username && (
                    <Message variant="formerror">
                        {errors.username.message}
                    </Message>
                )}
            </Label>

            <Label>
                <span>Email</span>
                <Input
                    {...register("email")}
                    type="email"
                    placeholder="@mail.com"
                    disabled
                />
                {errors.email && (
                    <Message variant="formerror">
                        {errors.email.message}
                    </Message>
                )}
            </Label>

            <Label>
                <span>Password</span>
                <PasswordInput
                    {...register("password")}
                    placeholder="********"
                    disabled={isSubmitting}
                    required
                />
                {errors.password && (
                    <Message variant="formerror">
                        {errors.password.message}
                    </Message>
                )}
            </Label>

            <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? <LoadingIcon2 /> : "Register"}
            </Button>
        </form>
    );
}
