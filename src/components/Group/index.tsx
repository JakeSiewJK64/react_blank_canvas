import { ReactNode } from "react";
import { cn } from "../../utils";

export const Group = ({
  children,
  className,
  gap,
}: {
  gap?: number;
  children: ReactNode | ReactNode[];
  className?: string;
}) => {
  return (
    <div className={cn(`flex flex-row gap-${gap} ${className}`)}>
      {children}
    </div>
  );
};
