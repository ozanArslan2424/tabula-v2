import { LibraryLink } from "@/components/core/link-btn";
import { ChangeUserRole, DeleteUser, InviteForm, ReInviteForm } from "@/components/forms/admin";
import TestPage from "@/components/layout/test-page";
import Button from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Message from "@/components/ui/message";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deleteBug, getAllBugs, getAllUsers, resolveBug } from "@/lib/actions/admin.actions";
import { getSession } from "@/lib/auth";
import { BugReportType, UserTableType } from "@/lib/types";
import { Command, TestTube2Icon, User } from "lucide-react";
import Image from "next/image";

export default async function AdminPage() {
  const { user } = await getSession();
  if (user && user.role !== "admin") {
    return (
      <div className="min-w-80">
        <Message className="mb-4" variant="error">
          You don&apos;t have permission to view this page.
        </Message>
        <LibraryLink />
      </div>
    );
  }

  if (user && user.role === "admin") {
    const users: UserTableType[] = await getAllUsers();
    const bugs: BugReportType[] = await getAllBugs();

    return (
      <Tabs defaultValue="users" className="min-h-screen">
        <TabsList className="my-2 flex w-full items-center justify-center gap-2 bg-transparent text-sm font-medium">
          <TabsTrigger
            value="users"
            className="border border-transparent bg-secondary hover:bg-secondary/50 data-[state=active]:border-primary/20"
          >
            <User className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger
            value="commands"
            className="border border-transparent bg-secondary hover:bg-secondary/50 data-[state=active]:border-primary/20"
          >
            <Command className="mr-2 h-4 w-4" />
            Control Panel
          </TabsTrigger>
          <TabsTrigger
            value="test"
            className="border border-transparent bg-secondary hover:bg-secondary/50 data-[state=active]:border-primary/20"
          >
            <TestTube2Icon className="mr-2 h-4 w-4" />
            Test
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <h1 className="text-lg font-semibold md:text-2xl">Bugs</h1>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bugs.map((bug) => (
                    <TableRow key={bug.id}>
                      <TableCell>{bug.subject}</TableCell>
                      <TableCell>{bug.description}</TableCell>
                      <TableCell>{bug.user.id}</TableCell>
                      <TableCell>
                        {bug.resolved ? (
                          <span className="px-2 py-1.5 font-semibold text-success">Resolved</span>
                        ) : (
                          <form
                            action={async () => {
                              "use server";
                              await resolveBug(bug.id);
                            }}
                          >
                            <Button type="submit">Resolve</Button>
                          </form>
                        )}
                      </TableCell>
                      <TableCell>
                        <form
                          action={async () => {
                            "use server";
                            await deleteBug(bug.id);
                          }}
                        >
                          <Button variant="danger" type="submit">
                            Delete
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Book Count</TableHead>
                    <TableHead>Quicknote Count</TableHead>
                    <TableHead>Tasks Count</TableHead>
                    <TableHead>Bug Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        {user.image && <Image src={user.image} alt={"user image"} width={32} height={32} />}
                      </TableCell>
                      <TableCell>{user.books.length}</TableCell>
                      <TableCell>{user.quicknotes.length}</TableCell>
                      <TableCell>{user.tasks.length}</TableCell>
                      <TableCell>{user.bugs.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={1}>Total User Count</TableCell>
                    <TableCell>{users.length}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </main>
        </TabsContent>

        <TabsContent value="commands">
          <main className="grid grid-flow-row grid-cols-1 gap-4 p-8 shadow-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Chnage user role</CardTitle>
                <CardDescription>Change user role to admin or user.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChangeUserRole users={users} />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delete user</CardTitle>
                <CardDescription>Delete user from the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <DeleteUser users={users} />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invite user</CardTitle>
                <CardDescription>Invite user using Email.</CardDescription>
              </CardHeader>
              <CardContent>
                <InviteForm />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reinvite user</CardTitle>
                <CardDescription>Invite user again using Email.</CardDescription>
              </CardHeader>
              <CardContent>
                <ReInviteForm users={users} />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </main>
        </TabsContent>
        <TabsContent value="test">
          <TestPage />
        </TabsContent>
      </Tabs>
    );
  }
}
