import { cn } from "@/lib/utils";
import * as React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => {
  return (
    <div className="relative cursor-pointer">
      <select
        className={cn(
          "cursor-pointer appearance-none",
          "w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground ring-ring transition-all",
          "ring-offset-1 ring-offset-background focus:border-transparent focus:outline-none focus:ring-1",
          "disabled:pointer-events-none disabled:opacity-50",
          "placeholder:text-muted-foreground",
          className,
        )}
        ref={ref}
        {...props}
      />
      <ChevronDown size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
    </div>
  );
});

Select.displayName = "Select";

export default Select;

const ChevronDown = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="#000000"
    viewBox="0 0 256 256"
  >
    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
  </svg>
);
