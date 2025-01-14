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
  onClick = () => {},
}: {
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
}) => {
  const buttonSizing = {
    sm: "h-8 px-4 text-sm",
    md: "h-11 px-6",
    lg: "h-12 px-6 text-lg",
  }[size];
  const buttonColor = {
    primary: "bg-[#3498db] text-white",
    danger: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
    warn: "bg-amber-400 text-black",
  }[color];

  return (
    <button
      className={cn(
        `rounded ${
          disabled && "opacity-25 cursor-not-allowed"
        } ${buttonColor} ${buttonSizing} ${className}`
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
