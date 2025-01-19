import { CSSProperties, ReactNode } from "react";
import { cn } from "../../utils";

export const Stack = ({
  children,
  className,
  gap,
  align,
  justify,
}: {
  gap?: string | number;
  children: ReactNode | ReactNode[];
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  className?: string;
}) => {
  return (
    <div
      className={cn(`flex flex-col ${className}`)}
      style={{
        gap,
        alignItems: align,
        justifyContent: justify,
      }}
    >
      {children}
    </div>
  );
};
