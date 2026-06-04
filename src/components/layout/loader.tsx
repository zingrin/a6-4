import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: number;
}

export const Loader = ({ className, size = 40 }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 
        size={size} 
        className={cn("animate-spin text-primary", className)} 
        />
    </div>
  );
};