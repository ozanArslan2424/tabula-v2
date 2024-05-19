"use client";
import { LandingPageLink } from "@/components/buttons/link-btn";
import RegisterForm from "@/components/forms/register";
import Message from "@/components/ui/message";
import { verifyInvite } from "@/lib/actions/auth.actions";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onVerify = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Verification token not found.");
      return;
    }

    verifyInvite(token).then((data) => {
      if (data.error) setError(data.error);
      if (data.expired) setError(data.expired);
      if (data.success && data.email) {
        setSuccess(data.success);
        setEmail(data.email);
      }
    });
  }, [token, success, error]);

  useEffect(() => {
    onVerify();
  }, [onVerify]);

  if (!success) return <Message variant="accent">Validating...</Message>;

  if (success && email) {
    return (
      <div className="min-w-80 space-y-4">
        <Message variant="success">Email and token validated.</Message>
        <h1 className="mb-4 text-center text-3xl font-bold">Create your account</h1>
        <RegisterForm email={email} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-w-80">
        <Message className="mb-4" variant="error">
          {error}
        </Message>
        <LandingPageLink />
      </div>
    );
  }
}