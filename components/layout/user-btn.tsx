import Button from "@/components/ui/button";
import { UserType } from "@/lib/types";
import { LogInIcon, UserCogIcon } from "lucide-react";
import Link from "next/link";

export default function UserButton({ user }: { user: UserType }) {
  if (!user) {
    return (
      <Link href="/login">
        <Button variant="outline" size="xs" className="bg-background">
          <LogInIcon size={12} className="shrink-0" />
          <span>Login</span>
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/settings" className="w-full flex-1">
      <Button variant="outline" size="xs" className="w-full bg-background">
        <UserCogIcon size={12} className="shrink-0" />
        <span>{user?.username}</span>
      </Button>
    </Link>
  );
}
