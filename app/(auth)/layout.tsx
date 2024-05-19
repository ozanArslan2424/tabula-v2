export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[calc(100dvh-48px)] w-full items-center justify-center">
      <div className="max-w-[800px]">{children}</div>
    </div>
  );
}
