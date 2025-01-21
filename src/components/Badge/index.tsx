import { ReactElement } from "react";
import { cn } from "../../utils";
import "../../index.css";

const variants = {
  variant: {
    primary: {
      primary: "bg-kt-6 text-white",
      danger: "bg-danger text-white",
      success: "bg-success text-white",
      warn: "bg-amber-600 text-white",
      secondary: "text-white bg-slate-600",
    },
    outline: {
      primary: "border border-kt-6 text-kt-6",
      danger: "border border-danger text-danger",
      success: "border border-success text-success",
      warn: "border border-amber-600 text-amber-600",
      secondary: "border border-slate-600 text-slate-600",
    },
  },
  size: {
    xs: "px-2 text-xs",
    sm: "px-2 text-sm",
    md: "px-4 py-1 text-md",
    lg: "px-6 py-2 text-lg",
    xl: "px-8 py-4 text-xl",
  },
};

/** Standard badge component. */
export const Badge = ({
  children = "Badge",
  className,
  size = "md",
  color = "primary",
  variant = "primary",
  withClose = false,
  onClick = () => {},
  onCloseClick = () => {},
}: {
  /** tailwind class */
  className?: string;
  /** children */
  children?: ReactElement | string;
  /** size of Badge */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** color of Badge */
  color?: "danger" | "warn" | "success" | "primary" | "secondary";
  /** badge variant */
  variant?: "primary" | "outline";
  /** onClick callback */
  onClick?: () => void;
  /** include close button */
  withClose?: boolean;
  /** on close button click */
  onCloseClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        `w-fit text-center font-bold rounded-full ${
          variants.variant[variant][color] ?? variants.variant.primary.primary
        } ${variants.size[size]} ${className}`
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
