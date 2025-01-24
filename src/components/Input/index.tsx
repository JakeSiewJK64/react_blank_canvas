import Monicon from "@monicon/react";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { cn } from "../../utils";
import { Stack } from "../Stack";
import { Highlight } from "../Highlight";
import { Loader } from "../Loader";
import "../../index.css";

export const AutoComplete = ({
  options,
  value,
  loading = false,
  onSelect = () => {},
  onChange = () => {},
  ...props
}: {
  value: string;
  label?: string;
  placeholder?: string;
  loading?: boolean;
  options: { label: string; value: string }[];
  onSelect: (e: { label: string; value: string }) => void;
  onChange: (value: string | number) => void;
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className="relative w-full"
      onFocus={() => setShowOptions(true)}
      onBlur={() => setShowOptions(false)}
    >
      <DebouncedInput
        {...props}
        value={value}
        className="w-full"
        onChange={(e) => onChange(e)}
      />
      {loading && (
        <div className="absolute right-0 top-2 me-2">
          <Loader size="xs" />
        </div>
      )}
      {showOptions && (
        <Stack
          gap={2}
          className="mt-1 absolute w-full bg-white border border-gray-300 rounded shadow-md z-2 p-1"
        >
          {options.length === 0 && (
            <Stack className="p-2 text-center text-sm" align="center">
              <Monicon size={20} name="lucide:package-open" />
              <div>There are no results available.</div>
            </Stack>
          )}
          {options.map((option) => (
            <div
              key={option.value}
              title={option.label}
              className="w-full text-sm p-2 hover:bg-slate-100 cursor-pointer text-ellipsis text-nowrap overflow-x-hidden"
              onClick={() => onSelect(option)}
            >
              <Highlight target={value}>{option.label}</Highlight>
            </div>
          ))}
        </Stack>
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
  label?: string;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
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
  label,
  ...props
}: {
  /** Error message (if any) */
  errorMessage?: string;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={props.className}>
      {label && <label>{label}</label>}
      <input
        {...props}
        className={cn(
          `shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errorMessage && "border-red-500"
          }`
        )}
      />
      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  );
};
