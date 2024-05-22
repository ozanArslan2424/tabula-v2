import { LoadingIcon } from "@/components/ui/loading";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoadingIcon size={128} />
    </div>
  );
}
