import { cn } from "../../utils";
import "../../index.css";

/** Primary UI component for user interaction 3 */
export const Button = ({
  size = "medium",
  label,
  color = "primary",
  className,
  onClick = () => {},
}: {
  className?: string;
  /** Background color of the button */
  color?: "warn" | "success" | "danger" | "primary";
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label?: string;
  /** Optional click handler */
  onClick?: () => void;
}) => {
  const buttonSizing = {
    small: "h-8 px-4 text-sm",
    medium: "h-11 px-6",
    large: "h-12 px-6 text-lg",
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
        `${buttonColor} active:mt-[2px] ${buttonSizing} rounded ${className}`
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
