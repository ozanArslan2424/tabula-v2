"use client";
import { cn } from "@/lib/utils";
import React from "react";

export interface DropzoneProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  onFileUpload: (file: File) => void;
}

const Dropzone = React.forwardRef<HTMLInputElement, DropzoneProps>(({ children, onFileUpload }, ref) => {
  const [dragOver, setDragOver] = React.useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    onFileUpload(file);
  };

  return (
    <div
      className={cn(
        "cursor- flex aspect-square max-w-64 items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted p-8 transition-all",
        dragOver && "bg-background ring-2 ring-success ring-offset-2",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input type="file" className="hidden" ref={ref} />
      <div>{children}</div>
    </div>
  );
});

Dropzone.displayName = "Dropzone";

export default Dropzone;
