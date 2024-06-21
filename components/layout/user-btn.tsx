import Button from "@/components/ui/button";
import { UserType } from "@/lib/types";
import { LogInIcon, UserCogIcon } from "lucide-react";
import Image from "next/image";
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
        <Link href="/settings">
            <Button
                variant="outline"
                size="icon_xs"
                className="w-full bg-background"
            >
                <div>
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.username}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                    ) : (
                        <UserCogIcon size={12} className="shrink-0" />
                    )}
                </div>
            </Button>
        </Link>
    );
}
