import Monicon from "@monicon/react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils";
import { Group } from "../Group";
import "../../index.css";

const variants = {
  variant: {
    default:
      "bg-kt-6 text-white hover:bg-kt-6/90 focus:ring-2 ring-kt-6 ring-offset-2",
    elevated:
      "active:border-b-2 border-b-4 border-b-kt-7 bg-kt-6 text-white hover:bg-kt-6/90",
    destructive: "bg-destructive text-white hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost:
      "hover:bg-accent hover:text-accent-foreground active:ring focus:ring",
    link: "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

/** Standard button component */
export const Button = ({
  size = "default",
  variant = "default",
  loading = false,
  icon,
  ...props
}: {
  icon?: ReactNode;
  /** button variant */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "elevated"
    | "link";
  /** How large should the button be? */
  size?: "default" | "sm" | "lg" | "icon";
  /** loader in button */
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={cn(
        `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${variants.size[size]} ${variants.variant[variant]} ${props.className}`
      )}
    >
      {loading && (
        <div className="animate-spin my-auto">
          <Monicon name="lucide:loader-circle" />
        </div>
      )}
      <Group align="center" gap={5} className="my-auto">
        {icon && icon}
        {props.children}
      </Group>
    </button>
  );
};
