import Monicon from "@monicon/react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils";
import "../../index.css";

const variants = {
  variant: {
    default:
      "bg-[#09ABC2] text-white hover:bg-primary/90 focus:ring-[#09ABC2] focus:ring-2 focus:ring-offset-2",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
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
  ...props
}: {
  /** button variant */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /** How large should the button be? */
  size?: "default" | "sm" | "lg" | "icon";
  /** loader in button */
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={cn(
        `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${variants.size[size]} ${variants.variant[variant]}`
      )}
    >
      {loading && (
        <div className="animate-spin my-auto">
          <Monicon name="lucide:loader-circle" />
        </div>
      )}
      <div className="my-auto">{props.children}</div>
    </button>
  );
};
