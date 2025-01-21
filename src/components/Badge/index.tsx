import { ReactElement } from "react";
import { cn } from "../../utils";
import "../../index.css";

/** Standard badge component. */
export const Badge = ({
  children = "Badge",
  className,
  size = "md",
  color = "none",
  withClose = false,
  onClick = () => {},
  onCloseClick = () => {},
}: {
  /** tailwind class */
  className?: string;
  /** children */
  children?: ReactElement | string;
  /** size of Badge */
  size?: "sm" | "md" | "lg" | "xl";
  /** color of Badge */
  color?: "danger" | "warn" | "success" | "primary" | "none";
  /** onClick callback */
  onClick?: () => void;
  /** include close button */
  withClose?: boolean;
  /** on close button click */
  onCloseClick?: () => void;
}) => {
  const sizing = {
    sm: "px-2",
    md: "px-4",
    lg: "px-6",
    xl: "px-8",
  }[size];
  const coloring = {
    none: "",
    danger: "bg-red-600 text-white",
    warn: "bg-amber-600 text-white",
    success: "bg-green-600 text-white",
    primary: "bg-[#09ABC2] text-white",
  }[color];

  return (
    <div
      onClick={onClick}
      className={cn(
        `bg-slate-200 border-slate-400 border-[1px] font-sans font-semibold text-sm rounded-full ${sizing} ${coloring} ${className}`
      )}
    >
      {children}
      {withClose && (
        <button className="text-xs ms-2" onClick={onCloseClick}>
          X
        </button>
      )}
    </div>
  );
};
