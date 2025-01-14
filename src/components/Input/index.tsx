import { HTMLInputTypeAttribute } from "react";
import { cn } from "../../utils";
import "../../index.css";

export const Input = ({
  placeholder,
  label,
  id,
  value,
  errorMessage,
  className,
  checked = false,
  type = "text",
  onChange = () => {},
}: {
  /** Error message (if any) */
  errorMessage?: string;
  /** Checked or not (applicable for checkbox input type) */
  checked?: boolean;
  /** Value of input */
  value?: string | number;
  /** Input label */
  label?: string;
  /** Input placeholder */
  placeholder?: string;
  /** Component classname */
  className?: string;
  /** Component id */
  id?: string;
  /** Input type */
  type?: HTMLInputTypeAttribute;
  /** onchange callback */
  onChange?: () => void;
}) => {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        onChange={onChange}
        className={cn(
          `shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errorMessage && "border-red-500"
          } ${className}`
        )}
        checked={checked}
        value={value}
        id={id}
        type={type}
        placeholder={placeholder}
      />
      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </>
  );
};
