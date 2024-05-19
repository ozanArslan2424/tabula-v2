import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const fileInputVariants = cva(
  "cursor-pointer text-wrap rounded-md border border-border px-3 py-1.5 ring-ring ring-offset-1 transition-all active:scale-[.98] focus:border-transparent focus:outline-none focus:ring-2 disabled:pointer-events-none disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground file:text-primary-foreground shadow-sm ring-offset-1",
        secondary: "bg-secondary text-secondary-foreground file:text-secondary-foreground shadow-sm",
        accent: "bg-accent text-accent-foreground file:text-accent-foreground shadow-sm",
        danger: "bg-danger text-danger-foreground file:text-danger-foreground shadow-sm",
        success: "bg-success text-success-foreground file:text-success-foreground shadow-sm",
        ghost: "bg-transparent text-foreground file:text-foreground hover:bg-muted hover:shadow-sm",
        outline: "bg-transparent text-foreground file:text-foreground border hover:bg-muted hover:shadow-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof fileInputVariants> {}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(({ variant, className, ...props }, ref) => {
  return <input className={cn(fileInputVariants({ variant }), className)} type="file" {...props} ref={ref} />;
});

FileInput.displayName = "FileInput";

export default FileInput;
