import { InputHTMLAttributes } from "react";
import { cn } from "../../utils";
import "../../index.css";

export const Input = ({
  label,
  errorMessage,
  ...props
}: {
  /** Error message (if any) */
  errorMessage?: string;
  /** Checked or not (applicable for checkbox input type) */
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className={cn(
          `shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errorMessage && "border-red-500"
          } ${props.className}`
        )}
        {...props}
      />
      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  );
};
