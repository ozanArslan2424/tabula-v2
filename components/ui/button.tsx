import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

export const buttonVariants = cva(
  "inline-flex font-medium items-center justify-center ring-offset-1 ring-offset-background disabled:opacity-50 disabled:pointer-events-none hover:opacity-90 focus:outline-none focus:ring-1 active:opacity-100 transition",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-sm ring-offset-1 ring-ring/50",
        secondary: "bg-secondary text-secondary-foreground shadow-sm ring-secondary/50",
        accent: "bg-accent text-accent-foreground shadow-sm ring-accent/50",
        danger: "bg-danger text-danger-foreground shadow-sm ring-danger/50",
        success: "bg-success text-success-foreground shadow-sm ring-success/50",
        ghost: "bg-transparent text-foreground hover:bg-muted hover:shadow-sm ring-secondary/50",
        outline: "bg-transparent text-foreground border hover:bg-muted hover:shadow-sm ring-secondary/50",
        unstyled: "ring-0 focus:ring-0",
      },
      size: {
        xs: "h-7 min-w-10 px-3 py-1 text-sm gap-1 rounded-md",
        sm: "h-8 min-w-14 px-3 py-2 text-sm gap-1 rounded-sm",
        base: "h-9 min-w-16 px-4 py-2 text-sm gap-2 rounded-md",
        md: "h-10 min-w-[4.5rem] px-4 py-2 text-base gap-2 rounded-md",
        lg: "h-12 min-w-20 px-4 py-2 text-md gap-2 rounded-lg",
        icon_sm: "h-8 w-8 p-1 text-sm rounded-sm aspect-square overflow-hidden shrink-0",
        icon: "h-9 w-9 p-1 text-base rounded-md aspect-square overflow-hidden shrink-0",
        icon_lg: "h-12 w-12 p-1 text-md rounded-lg aspect-square overflow-hidden shrink-0",
        circle: "h-7 w-7 p-1 text-sm rounded-full aspect-square overflow-hidden shrink-0",
        unsized: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <button ref={ref} {...props} className={cn(buttonVariants({ variant, size }), className, "")}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
