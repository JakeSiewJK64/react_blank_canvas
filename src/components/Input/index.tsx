import { InputHTMLAttributes, useEffect, useState } from "react";
import { cn } from "../../utils";
import "../../index.css";

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Input = ({
  errorMessage,
  ...props
}: {
  /** Error message (if any) */
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
      <input
        {...props}
        className={cn(
          `shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errorMessage && "border-red-500"
          } ${props.className}`
        )}
      />
      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  );
};
