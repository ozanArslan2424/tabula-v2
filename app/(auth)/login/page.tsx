import LoginForm from "@/components/forms/login";
import RequestInviteForm from "@/components/forms/req-invite";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await getSession();
  if (user) {
    redirect("/dash");
  }

  return (
    <div className="min-w-80">
      <h1 className="mb-4 text-center text-3xl font-bold">Login</h1>
      <LoginForm />
      <div className="my-4 flex items-center gap-2">
        <div className="h-0.5 w-full bg-secondary"></div>
        <p className="text-primary">or</p>
        <div className="h-0.5 w-full bg-secondary"></div>
      </div>
      <RequestInviteForm />
    </div>
  );
}
