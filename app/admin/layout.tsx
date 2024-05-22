import { Header } from "@/components/layout/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="full-screen">
      <Header />
      <div className="mx-auto max-w-[500px] space-y-4 p-4 md:p-16">{children}</div>
    </div>
  );
}
