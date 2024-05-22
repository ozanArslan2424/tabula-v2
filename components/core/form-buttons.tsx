"use client";
import Button from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

export const SmallFormButtons = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <div className="flex items-center gap-2">
      <Button type="submit" variant="success" size="circle">
        <span className="sr-only">Save</span>
        <CheckIcon size={18} />
      </Button>
      <Button variant="danger" size="circle" onClick={onCancel}>
        <span className="sr-only">Cancel</span>
        <XIcon size={18} />
      </Button>
    </div>
  );
};
