import { QuicknoteList } from "@/components/core/q-note-list";
import MobileHeader from "@/components/layout/mobile-header";
import { getQuicknotes } from "@/lib/actions/read";
import { UserType } from "@/lib/types";

type Props = {
  user: UserType;
};

export const DashMenu = async ({ user }: Props) => {
  if (!user) return null;
  const quicknotes = await getQuicknotes(user.id);

  return (
    <MobileHeader user={user}>
      <div className="group flex h-[60px] items-center justify-between border-b border-primary/10 px-6 py-4">
        <h1 className="text-2xl font-semibold tracking-tight">Quick Notes</h1>
      </div>
      <QuicknoteList userId={user.id} quicknotes={quicknotes} />
    </MobileHeader>
  );
};
