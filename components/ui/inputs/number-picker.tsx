import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";

export interface NumberPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  initialValue?: number;
}

const NumberPicker = forwardRef<HTMLInputElement, NumberPickerProps>(
  ({ initialValue, className, onChange, ...props }, ref) => {
    const [isValue, setIsValue] = useState(initialValue);

    const handleMouseDown = (callback: () => void, timer: number) => {
      const interval = setInterval(() => {
        // callback function here
        callback();
      }, timer);
      const handleMouseUp = () => {
        clearInterval(interval);
        window.removeEventListener("mouseup", handleMouseUp);
      };
      window.addEventListener("mouseup", handleMouseUp);
    };

    const increment = () => {
      setIsValue((prev) => (prev === undefined ? 1 : prev + 1));
    };

    const decrement = () => {
      setIsValue((prev) => (prev === undefined ? -1 : prev - 1));
    };

    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
      handleMouseDown(() => {
        increment();
      }, 80);
    };

    const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
      handleMouseDown(() => {
        decrement();
      }, 80);
    };

    const combinedOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsValue(Number(e.target.value));
      onChange?.(e);
    };
    return (
      <div className="flex rounded-md ring-ring transition focus-within:border-transparent focus-within:outline-none focus-within:ring-2">
        <input
          className={cn(
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            "flex w-full items-center gap-2 rounded-l-md border border-border bg-background px-3 py-1.5 text-foreground  transition-all",
            "focus:outline-none",
            "disabled:pointer-events-none disabled:opacity-50",
            "placeholder:text-muted-foreground",
            className,
          )}
          type="number"
          onChange={combinedOnChange}
          value={isValue}
          ref={ref}
          {...props}
        />
        <div>
          <button
            className="flex h-1/2 w-6 items-center justify-center rounded-tr-md border-r border-t font-medium hover:bg-muted"
            onMouseDown={handleIncrement}
          >
            +
          </button>
          <button
            className="flex h-1/2 w-6 items-center justify-center rounded-br-md border-y border-r font-medium hover:bg-muted"
            onMouseDown={handleDecrement}
          >
            -
          </button>
        </div>
      </div>
    );
  },
);

NumberPicker.displayName = "NumberPicker";
export default NumberPicker;
