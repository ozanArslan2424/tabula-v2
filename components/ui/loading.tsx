import { cn } from "@/lib/utils";

export const LoadingIcon = ({ size = 24 }: { size?: number }) => {
  return <CircleDashedBold size={size} className="animate-spin" />;
};

export const LoadingIcon2 = () => {
  return (
    <div className="flex items-center gap-1 text-primary">
      <CircleFill className="animate-pulse duration-700" />
      <CircleFill className="animate-pulse delay-150 duration-700" />
      <CircleFill className="animate-pulse delay-300 duration-700" />
    </div>
  );
};

const CircleFill = ({ className }: { className: string }) => {
  return (
    <svg
      className={cn("fill-accent", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 256 256"
    >
      <path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path>
    </svg>
  );
};

const CircleDashedBold = ({ className, size }: { className: string; size: number }) => {
  return (
    <svg
      className={cn("fill-accent", className)}
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 256 256"
    >
      <path d="M92.38,38.05A12,12,0,0,1,101,23.42a108,108,0,0,1,54,0,12,12,0,1,1-6,23.23,84.11,84.11,0,0,0-42,0A12,12,0,0,1,92.38,38.05ZM50.94,52.34a108.1,108.1,0,0,0-27,46.76,12,12,0,0,0,8.37,14.77,12.2,12.2,0,0,0,3.2.43,12,12,0,0,0,11.56-8.8,84,84,0,0,1,21-36.35A12,12,0,1,0,50.94,52.34Zm-3.88,98.14a12,12,0,0,0-23.12,6.42,108,108,0,0,0,27,46.78A12,12,0,0,0,68,186.85,84,84,0,0,1,47.06,150.48ZM149,209.35a84,84,0,0,1-42,0,12,12,0,1,0-6,23.23,108,108,0,0,0,54,0,12,12,0,1,0-6-23.23Zm74.72-67.22A12,12,0,0,0,209,150.5a84,84,0,0,1-21,36.35,12,12,0,0,0,17.12,16.82,108.19,108.19,0,0,0,27-46.77A12,12,0,0,0,223.71,142.13Zm-14.77-36.61a12,12,0,0,0,23.12-6.42,108,108,0,0,0-27-46.78A12,12,0,1,0,188,69.15,84,84,0,0,1,208.94,105.52Z"></path>
    </svg>
  );
};
