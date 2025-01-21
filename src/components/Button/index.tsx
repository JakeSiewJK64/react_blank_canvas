import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils";
import { Group } from "../Group";
import { Loader } from "../Loader";
import "../../index.css";

const variants = {
  variant: {
    elevated: {
      primary:
        "bg-kt-6 text-white hover:bg-kt-6/90 border-b-[6px] border-kt-7 active:border-b-[2px]",
      danger:
        "bg-danger text-white hover:bg-danger/90 border-b-[6px] border-red-700 active:border-b-[2px]",
      success:
        "bg-success text-white hover:bg-success/90 border-b-[6px] border-green-700 active:border-b-[2px]",
    },
    primary: {
      primary: "bg-kt-6 text-white hover:bg-kt-6/90",
      danger: "bg-danger text-white hover:bg-danger/90",
      success: "bg-success text-white hover:bg-success/90",
      secondary:
        "bg-slate-600 border border-slate-200 text-white hover:bg-slate-100",
    },
    outline: {
      secondary:
        "bg-tranparent border border-slate-300 text-slate-600 hover:bg-slate-100",
      primary: "border border-kt-6 text-kt-6 hover:border border-kt-6/90",
      danger: "border border-danger text-danger hover:border border-danger/90",
      success:
        "border border-success text-success hover:border border-success/90",
    },
  },
  size: {
    xs: "h-7 rounded-md px-3",
    sm: "h-9 rounded-md px-3",
    md: "h-10 px-4 py-2",
    lg: "h-11 rounded-md px-8",
    xl: "h-12 rounded-md px-9",
  },
};

/** Standard button component */
export const Button = ({
  size = "md",
  color = "primary",
  variant = "primary",
  loading = false,
  icon,
  ...props
}: {
  icon?: ReactNode;
  /** color of the button */
  color?: "primary" | "danger" | "success" | "secondary";
  /** button variant */
  variant?: "primary" | "outline";
  /** How large should the button be? */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** loader in button */
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={cn(
        `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${
          variants.size[size]
        } ${
          variants.variant[variant][color] ?? variants.variant.primary.primary
        } ${props.className}`
      )}
    >
      {loading && <Loader size="md" color="white" />}
      <Group align="center" gap={5} className="my-auto">
        {icon && icon}
        {props.children}
      </Group>
    </button>
  );
};
