import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export const Container = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn("mx-auto w-full max-w-7xl px-4 lg:px-8", className)}
    {...props}
  >
    {children}
  </div>
);
