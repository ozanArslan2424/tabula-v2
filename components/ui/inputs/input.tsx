import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex w-full items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-foreground ring-ring transition-all",
        "ring-offset-1 ring-offset-background focus:border-transparent focus:outline-none focus:ring-1",
        "disabled:pointer-events-none disabled:opacity-50",
        "placeholder:text-muted-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
