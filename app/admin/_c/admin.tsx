"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import Select from "@/components/ui/inputs/select";
import Label from "@/components/ui/label";
import Message from "@/components/ui/message";

import {
    createNewToken,
    createUser,
    deleteUser,
    updateUserRole,
} from "@/lib/actions/admin.actions";
import { UserTableType } from "@/lib/types";
import { EmailSchema } from "@/lib/types/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function InviteForm() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
    });

    const onSubmit = (values: z.infer<typeof EmailSchema>) => {
        createUser(values.email).then((data) => {
            if (data.error) setError(true);
            if (data.success) setSuccess(true);
        });
    };

    return (
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
                <Message variant="error">{errors.root.message}</Message>
            )}

            <Label>
                <span>Email to be invited</span>
                <Input
                    {...register("email")}
                    type="email"
                    placeholder="@mail.com"
                    disabled={isSubmitting}
                    required
                />
                {errors.email && (
                    <Message variant="formerror">
                        {errors.email.message}
                    </Message>
                )}
            </Label>

            <Button disabled={isSubmitting} type="submit" className="w-full">
                Send Invite
            </Button>

            {success && !error && (
                <Message variant="success">Invite sent!</Message>
            )}
            {!success && error && (
                <Message variant="error">
                    There was an error. Please try again.
                </Message>
            )}
        </form>
    );
}

export function ReInviteForm({ users }: { users: UserTableType[] }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createNewToken(selectedUserId).then((data) => {
            if (data.error) setError(true);
            if (data.success) setSuccess(true);
        });
    };

    return (
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <Label>
                <span>Email to be re-invited</span>
                <Select
                    name="reuserselect"
                    id="reuserselect"
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    value={selectedUserId}
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.email}
                        </option>
                    ))}
                </Select>
            </Label>

            <Button type="submit" className="w-full">
                Invite again
            </Button>

            {success && !error && (
                <Message variant="success">Invite sent!</Message>
            )}
            {!success && error && (
                <Message variant="error">
                    There was an error. Please try again.
                </Message>
            )}
        </form>
    );
}

export function DeleteUser({ users }: { users: UserTableType[] }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        deleteUser(selectedUserId).then((data) => {
            if (data.error) setError(true);
            if (data.success) setSuccess(true);
        });
    };

    return (
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <Label>
                <span>User to be deleted</span>
                <Select
                    name="userselect"
                    id="userselect"
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    value={selectedUserId}
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </Select>
            </Label>

            <Button variant="danger" type="submit" className="w-full">
                Delete User
            </Button>

            {success && !error && (
                <Message variant="success">User deleted!</Message>
            )}
            {!success && error && (
                <Message variant="error">
                    There was an error. Please try again.
                </Message>
            )}
        </form>
    );
}

export function ChangeUserRole({ users }: { users: UserTableType[] }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [targetRole, setTargetRole] = useState<"admin" | "user">("user");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUserRole(selectedUserId, targetRole).then((data) => {
            if (data.error) setError(true);
            if (data.success) setSuccess(true);
        });
    };

    return (
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <Label>
                <span>Pick user</span>
                <Select
                    name="userselectrole"
                    id="userselectrole"
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    value={selectedUserId}
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </Select>
            </Label>

            <Select
                name="roleselect"
                id="roleselect"
                onChange={(e) =>
                    setTargetRole(e.target.value as "admin" | "user")
                }
                value={targetRole}
            >
                <option value="admin">admin</option>
                <option value="user">user</option>
            </Select>

            <Button type="submit" className="w-full">
                Change Role
            </Button>

            {success && !error && (
                <Message variant="success">User role changed!</Message>
            )}
            {!success && error && (
                <Message variant="error">
                    There was an error. Please try again.
                </Message>
            )}
        </form>
    );
}
