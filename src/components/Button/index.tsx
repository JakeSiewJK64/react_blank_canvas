import Monicon from "@monicon/react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils";
import "../../index.css";

/** Standard button component */
export const Button = ({
  size = "md",
  color = "primary",
  loading = false,
  variant = "primary",
  ...props
}: {
  /** button variant */
  variant?: "outline" | "primary" | "text";
  /** Background color of the button */
  color?: "warn" | "success" | "danger" | "primary";
  /** How large should the button be? */
  size?: "sm" | "md" | "lg";
  /** loader in button */
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonSizing = {
    xs: "h-4 px-4 text-sm",
    sm: "h-8 px-4 text-sm",
    md: "h-11 px-6",
    lg: "h-12 px-6 text-lg",
  }[size];
  const buttonPrimaryColor = {
    primary: "bg-[#3498db] text-white",
    danger: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
    warn: "bg-amber-400 text-black",
  }[color];
  const buttonOutlineColor = {
    primary: "bg-transparent text-[#3498db] border border-[#3498db]",
    danger: "bg-transparent text-red-600 border border-red-500",
    success: "bg-transparent text-green-600 border border-green-500",
    warn: "bg-transparent text-amber-600 border border-amber-500",
  }[color];
  const buttonTextColor = {
    primary: "bg-transparent text-[#3498db] focus:ring-2 focus:ring-blue-500",
    danger: "bg-transparent text-red-600 focus:ring-2 focus:ring-blue-500",
    success: "bg-transparent text-green-600 focus:ring-2 focus:ring-blue-500",
    warn: "bg-transparent text-amber-600 focus:ring-2 focus:ring-blue-500",
  }[color];
  const buttonColor = {
    primary: buttonPrimaryColor,
    outline: buttonOutlineColor,
    text: buttonTextColor,
  }[variant];
  const disableStyling =
    (props.disabled || loading) && "opacity-25 cursor-not-allowed";

  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={cn(
        `rounded flex flex-row gap-2 ${disableStyling} ${buttonColor} ${buttonSizing} ${props.className}`
      )}
    >
      {loading && (
        <div className="animate-spin my-auto">
          <Monicon
            name="lucide:loader-circle"
            size={{ xs: 6, sm: 12, md: 24, lg: 24 }[size]}
          />
        </div>
      )}
      <div className="my-auto">{props.children}</div>
    </button>
  );
};
