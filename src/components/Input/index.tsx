import { InputHTMLAttributes, MouseEvent, useEffect, useState } from "react";
import { cn } from "../../utils";
import { Stack } from "../Stack";
import "../../index.css";

export const AutoComplete = ({
  value,
  options,
  loading = false,
  showOptions = false,
  onSelect = () => {},
  onChange = () => {},
  onMouseLeave = () => {},
}: {
  showOptions?: boolean;
  loading?: boolean;
  value: string | number;
  options: { label: string; value: string }[];
  onSelect: (e: { label: string; value: string }) => void;
  onChange: (value: string | number) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
}) => {
  return (
    <div className="relative w-full">
      <DebouncedInput
        type="text"
        value={value}
        className="w-full"
        onChange={(e) => {
          onChange(e);
        }}
      />
      {loading && <div>Loading...</div>}
      {showOptions && (
        <div onMouseLeave={(e) => onMouseLeave(e)}>
          <Stack
            gap={2}
            className="mt-1 absolute w-full bg-white border border-gray-300 rounded shadow-md z-2"
          >
            {options.map((option) => (
              <div
                key={option.value}
                title={option.label}
                className="w-full text-sm p-2 hover:bg-slate-100 cursor-pointer text-ellipsis text-nowrap overflow-x-hidden"
                onClick={() => {
                  onSelect(option);
                }}
              >
                {option.label}
              </div>
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

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
