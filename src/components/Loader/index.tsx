import Monicon from "@monicon/react";
import "../../index.css";

const DEFAULT_COLORS: Record<string, string> = {
  danger: "red",
  success: "#40c057",
  secondary: "#475569",
};

export const Loader = ({
  color = "#09ABC2",
  size = "md",
}: {
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  const sizing = {
    xs: 24,
    sm: 36,
    md: 48,
    lg: 60,
    xl: 72,
  }[size];
  return (
    <div className="animate-spin">
      <Monicon
        name="lucide:loader-circle"
        color={DEFAULT_COLORS[color] ?? color}
        size={sizing}
      />
    </div>
  );
};
