import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { cn } from "../../utils";
import { Group } from "../Group";
import { Stack } from "../Stack";
import "../../index.css";

const sizeOption = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
};

export const Checkbox = ({
  label,
  description,
  size = "md",
  ...props
}: {
  label?: string;
  description?: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>) => {
  return (
    <Group gap="1rem" align="center">
      <input
        {...props}
        type="checkbox"
        className={cn(
          `${sizeOption[size]} cursor-pointer accent-kt-7 ${props.className}`
        )}
      />
      <Stack>
        {label && <div className="text-sm">{label}</div>}
        {description && (
          <div className="text-sm text-slate-600">{description}</div>
        )}
      </Stack>
    </Group>
  );
};
