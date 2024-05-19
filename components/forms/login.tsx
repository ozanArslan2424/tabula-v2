"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import PasswordInput from "@/components/ui/inputs/password-input";
import Label from "@/components/ui/label";
import { LoadingIcon2 } from "@/components/ui/loading";
import Message from "@/components/ui/message";
import { login } from "@/lib/actions/auth.actions";
import { LoginSchema } from "@/lib/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    login(values).then((data) => {
      if (data.error) {
        setError("root", { message: data.error });
      }
      if (data.success) {
        setSuccess(data.success);
      }
    });
  };

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <Message variant="error">{errors.root.message}</Message>}
      {success && !errors && <Message variant="success">{success}</Message>}
      <Label>
        <span>Email</span>
        <Input {...register("email")} type="email" placeholder="@mail.com" disabled={isSubmitting} required />
        {errors.email && <Message variant="formerror">{errors.email.message}</Message>}
      </Label>

      <Label>
        <span>Password</span>
        <PasswordInput {...register("password")} placeholder="********" disabled={isSubmitting} required />
        {errors.password && <Message variant="formerror">{errors.password.message}</Message>}
      </Label>

      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isSubmitting ? <LoadingIcon2 /> : "Login"}
      </Button>
    </form>
  );
}
