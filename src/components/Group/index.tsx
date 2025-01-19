import { CSSProperties, ReactNode } from "react";
import { cn } from "../../utils";

export const Group = ({
  children,
  className,
  gap,
  align,
  justify,
}: {
  gap?: number;
  children: ReactNode | ReactNode[];
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `flex flex-row gap-${gap} justify-${justify} items-${align} ${className}`
      )}
    >
      {children}
    </div>
  );
};
