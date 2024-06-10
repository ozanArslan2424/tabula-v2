import { SettingsForm } from "@/components/forms/settings";
import { AdminLink, LibraryLink } from "@/components/parts/link-btn";
import Button from "@/components/ui/button";
import { logout } from "@/lib/actions/auth.actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const { user } = await getSession();
    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-w-80">
            <h1 className="mb-6 text-center text-3xl font-bold">Settings</h1>

            <SettingsForm user={user} />

            <div className="my-6 h-0.5 w-full bg-secondary"></div>

            <div className="space-y-4">
                {user?.role === "admin" && <AdminLink />}

                <LibraryLink />

                <form action={logout}>
                    <Button className="w-full" variant="danger" type="submit">
                        Logout
                    </Button>
                </form>
            </div>
        </div>
    );
}
