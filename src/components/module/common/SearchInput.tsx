import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className=" relative">
        <Icons.Search
          className="text-gray-100 absolute left-4 bottom-8"
          size={20}
        />
        <Input
          className={cn("pl-10 rounded-sm", className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "searchInput";
