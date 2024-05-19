"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className, onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(props.defaultChecked ?? false);

    function combinedOnChange(e: React.ChangeEvent<HTMLInputElement>) {
      setIsChecked(!isChecked);
      onChange?.(e);
    }

    return (
      <label
        data-state={isChecked ? "checked" : "null"}
        className={cn("flex w-full cursor-pointer items-center gap-2 text-sm", className)}
      >
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-primary bg-background">
          {isChecked && <div className="aspect-square h-3 w-3 rounded-sm bg-primary"></div>}
        </div>
        <input {...props} type="checkbox" hidden ref={ref} onChange={combinedOnChange} />
        {children}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
