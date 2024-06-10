export type UserType = {
    id: string;
    email: string;
    username: string;
    image: string;
    role: string;
} | null;

export type BookType = {
    title: string;
    userId: string;
    id: string;
    description: string | null;
    createdAt: Date;
    hasTasks: boolean;
    tasks: TaskType[];
    notes: NoteType[];
};

export type BookInfoType = {
    id: string;
    title: string;
    description: string | null;
    createdAt: Date;
    hasTasks: boolean;
    tasks: { name: string }[];
    notes: { title: string }[];
};

export type NoteType = {
    id: string;
    title: string;
    content: string | null;
    createdAt: Date;
    bookId: string;
};

export type UserTableType = {
    id: string;
    username: string | null;
    email: string | null;
    emailVerified: boolean;
    image: string | null;
    role: "user" | "admin";
    books: { id: string }[];
    tasks: { id: string }[];
    quicknotes: { id: string }[];
    bugs: { id: string }[];
};

export type BugReportType = {
    id: string;
    subject: string;
    description: string;
    resolved: boolean;
    user: { id: string; username: string | null };
};

export type TaskType = {
    id: string;
    name: string;
    completed: boolean;
    bookId: string;
    userId: string;
};

export type QuicknoteType = {
    id: string;
    userId: string;
    content: string;
};
