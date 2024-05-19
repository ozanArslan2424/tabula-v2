"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface ColorPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(({ color, className, ...props }, ref) => {
  const [isColor, setIsColor] = React.useState(color ? color : "#000000");
  return (
    <div
      className={cn(
        "cursor-pointer bg-background text-foreground",
        "min-h-10 w-full rounded-md border",
        "ring-ring focus:border-transparent focus:outline-none focus:ring-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      style={{ backgroundColor: isColor }}
    >
      <input
        className="opacity-0"
        type="color"
        ref={ref}
        value={isColor}
        onChange={(e) => {
          setIsColor(e.target.value);
        }}
        {...props}
      />
    </div>
  );
});

ColorPicker.displayName = "ColorPicker";

export default ColorPicker;
