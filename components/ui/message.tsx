import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const messageVariants = cva("font-medium px-4 py-2 rounded-md text-center", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground shadow-sm",
      secondary: "bg-secondary text-secondary-foreground shadow-sm",
      accent: "bg-accent text-accent-foreground shadow-sm",
      error: "bg-danger text-danger-foreground shadow-sm",
      formerror: "bg-transparent text-danger text-left p-0",
      success: "bg-success text-success-foreground shadow-sm",
      ghost: "bg-transparent text-foreground",
      outline: "bg-transparent text-foreground border",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof messageVariants> {
  children: React.ReactNode;
  className?: string;
}

const Message = ({ children, className, variant }: MessageProps) => {
  return <div className={cn(messageVariants({ variant }), className)}>{children}</div>;
};
Message.displayName = "Message";

export default Message;
