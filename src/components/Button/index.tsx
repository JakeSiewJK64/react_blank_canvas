import Monicon from "@monicon/react";
import { ReactElement } from "react";
import { cn } from "../../utils";
import "../../index.css";

/** Standard button component */
export const Button = ({
  children = "Button",
  size = "md",
  color = "primary",
  className,
  disabled = false,
  loading = false,
  onClick = () => {},
  variant = "primary",
}: {
  /** button variant */
  variant?: "outline" | "primary";
  /** children to be rendered in button */
  children: ReactElement | string;
  /** style class for button */
  className?: string;
  /** Background color of the button */
  color?: "warn" | "success" | "danger" | "primary";
  /** How large should the button be? */
  size?: "sm" | "md" | "lg";
  /** disable button */
  disabled?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** loader in button */
  loading?: boolean;
}) => {
  const buttonSizing = {
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
  const buttonColor = {
    primary: buttonPrimaryColor,
    outline: buttonOutlineColor,
  }[variant];
  const disableStyling =
    (disabled || loading) && "opacity-25 cursor-not-allowed";

  return (
    <button
      className={cn(
        `rounded flex flex-row gap-2 ${disableStyling} ${buttonColor} ${buttonSizing} ${className}`
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <div className="animate-spin my-auto">
          <Monicon
            name="lucide:loader-circle"
            size={{ sm: 12, md: 24, lg: 24 }[size]}
          />
        </div>
      )}
      <div className="my-auto">{children}</div>
    </button>
  );
};
