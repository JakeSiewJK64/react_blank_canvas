import { ReactElement } from "react";
import { cn } from "../../utils";
import "../../index.css";

export const Card = ({
  children,
  className,
  title = "Card Title",
}: {
  /** title of the card */
  title?: string;
  /** class name of the card */
  className?: string;
  /** children to render inside the card */
  children: ReactElement | ReactElement[];
}) => {
  return (
    <div
      className={cn(`border-slate-300 border rounded shadow p-2 ${className}`)}
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
