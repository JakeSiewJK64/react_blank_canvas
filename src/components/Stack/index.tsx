import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils";

export const Stack = ({
  children,
  className,
  gap,
  align,
  justify,
  ...props
}: {
  gap?: string | number;
  children: ReactNode | ReactNode[];
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
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
