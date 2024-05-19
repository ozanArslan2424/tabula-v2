import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full bg-background text-foreground transition",
        "w-full rounded-md border border-border px-3 py-2 ring-ring",
        "focus:border-transparent focus:outline-none focus:ring-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "placeholder:text-muted-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
