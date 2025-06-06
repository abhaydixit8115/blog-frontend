import React from "react";
import { cn } from "@/lib/utils";

interface MaxWidthProps {
  className: string;
  children: React.ReactNode;
}

const MaxWidthWrapper = ({ className, children }: MaxWidthProps) => {
  return <div className={cn("mx-auto w-full m-12", className)}>{children}</div>;
};

export default MaxWidthWrapper;
