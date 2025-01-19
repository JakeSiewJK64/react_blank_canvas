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
  const justifyContent = `justify-${justify?.replaceAll("space-", "")}`;

  return (
    <div
      className={cn(
        `flex flex-row gap-${gap} ${justifyContent} items-${align} ${className}`
      )}
    >
      {children}
    </div>
  );
};
