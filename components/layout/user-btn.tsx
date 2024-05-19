import { BugReport } from "@/components/buttons/new-bug-btn";
import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions/auth.actions";
import { UserType } from "@/lib/types";
import { HomeIcon, LogOutIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";

export default function UserButton({ user }: { user: UserType }) {
  if (!user) {
    return (
      <Link href="/login" className="btn">
        Giriş Yap
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="xs" variant="outline" className="bg-secondary/50">
          {user.username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="text-base">{user?.username}</p>
          <p className="text-xs font-normal text-muted-foreground">{user?.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link href="/dash">
          <DropdownMenuItem>
            <HomeIcon size={14} className="mr-2" /> Library
          </DropdownMenuItem>
        </Link>

        <Link href="/settings">
          <DropdownMenuItem>
            <Settings2Icon size={14} className="mr-2" /> Settings
          </DropdownMenuItem>
        </Link>

        <form action={logout}>
          <button type="submit" className="w-full">
            <DropdownMenuItem className="group">
              <LogOutIcon size={14} className="group-hover:text-destructive mr-2" /> Logout
            </DropdownMenuItem>
          </button>
        </form>

        <DropdownMenuSeparator />

        <BugReport userEmail={user.email} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
