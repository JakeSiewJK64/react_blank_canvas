import { CSSProperties, ReactNode } from "react";
import { cn } from "../../utils";

export const Stack = ({
  children,
  className,
  gap,
  align,
  justify,
}: {
  gap?: number;
  children: ReactNode | ReactNode[];
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyItems"];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `flex flex-col gap-${gap} justify-${justify} items-${align} ${className}`
      )}
    >
      {children}
    </div>
  );
};
