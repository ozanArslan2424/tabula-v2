"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import PasswordInput from "@/components/ui/inputs/password-input";
import Label from "@/components/ui/label";
import { LoadingIcon2 } from "@/components/ui/loading";
import Message from "@/components/ui/message";

import { updateSettings } from "@/lib/actions/auth.actions";
import { UserType } from "@/lib/types";
import { SettingsSchema } from "@/lib/types/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SettingsForm = ({ user }: { user: UserType }) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            userId: user?.id,
            email: user?.email,
            username: user?.username,
        },
    });

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        updateSettings(values).then((data) => {
            if (data.error) setError(true);
            if (data.success) setSuccess(true);
        });
    };

    return (
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {success && !error && (
                <Message variant="success">Settings saved.</Message>
            )}
            {!success && error && (
                <Message variant="error">
                    There was an error. Please try again.
                </Message>
            )}
            {errors.root && (
                <Message variant="error">{errors.root.message}</Message>
            )}
            <Label>
                <span>Email</span>
                <Input
                    {...register("email")}
                    type="email"
                    disabled={isSubmitting}
                    required
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

            <Label>
                <span>New Password</span>
                <PasswordInput
                    {...register("newPassword")}
                    placeholder="********"
                    disabled={isSubmitting}
                    required
                />
                {errors.newPassword && (
                    <Message variant="formerror">
                        {errors.newPassword.message}
                    </Message>
                )}
            </Label>

            <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? <LoadingIcon2 /> : "Save Settings"}
            </Button>
        </form>
    );
};
