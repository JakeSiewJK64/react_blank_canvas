import { ReactElement } from "react";
import { cn } from "../../utils";
import "../../index.css";

export const Card = ({
  children,
  className,
  title = "Card Title",
  padding = "md",
}: {
  /** title of the card */
  title?: string;
  /** class name of the card */
  className?: string;
  /** children to render inside the card */
  children: ReactElement | ReactElement[];
  /** card content padding */
  padding?: "xs" | "sm" | "md" | "lg";
}) => {
  const userPadding = { xs: "p-2", sm: "p-4", md: "p-6", lg: "p-8" }[padding];

  return (
    <div
      className={cn(
        `border-slate-300 border rounded shadow ${userPadding} ${className}`
      )}
    >
      {title && (
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
