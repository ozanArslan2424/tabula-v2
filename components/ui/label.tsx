import { cn } from "@/lib/utils";
import * as React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      {...props}
      className={cn("grid w-full grid-flow-row grid-cols-1 gap-y-1 text-sm font-medium", className)}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;
