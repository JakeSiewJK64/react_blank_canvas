import Monicon from "@monicon/react";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { cn } from "../../utils";
import { Stack } from "../Stack";
import { Highlight } from "../Highlight";
import { Loader } from "../Loader";
import { Group } from "../Group";
import "../../index.css";

type SelectObject = { label: string; value: string; children?: SelectObject[] };

export const TreeSelect = ({
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
  options: SelectObject[];
  onSelect: (e: SelectObject) => void;
  onChange: (value: string | number) => void;
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const TreeSelectChild = (option: SelectObject) => {
    const [open, setOpen] = useState(false);

    return (
      <div
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setShowOptions(false);
          }
        }}
      >
        <Group
          gap={2}
          align="center"
          justify="space-between"
          onClick={() => setOpen((old) => !old)}
          className={`p-1 hover:bg-slate-100 cursor-pointer ${
            (option.children?.length ?? 0) > 0 && open && "bg-slate-100"
          }`}
        >
          <label title={option.label} className="text-sm text-slate-600">
            {option.label} ({option.children?.length ?? 0})
          </label>
          {(option.children?.length ?? 0) > 0 && (
            <div
              title={`Expand ${option.label}`}
              className={`hover:bg-transparent transform transition-transform duration-300 ${
                open ? "rotate-0" : "rotate-180"
              }`}
            >
              <Monicon name="lucide:arrow-down" size={15} />
            </div>
          )}
        </Group>
        {(option.children ?? []).map((child, index) => {
          if (open) {
            if (child.children) {
              return (
                <div className={cn(`ms-${index}`)} key={JSON.stringify(child)}>
                  <TreeSelectChild {...child} />
                </div>
              );
            }

            return (
              <div
                key={JSON.stringify(child)}
                title={option.label}
                className="w-full text-sm p-2 hover:bg-slate-100 cursor-pointer text-ellipsis text-nowrap overflow-x-hidden"
                tabIndex={0}
                onClick={() => {
                  onSelect(child);
                  setShowOptions(false);
                }}
              >
                <Highlight target={value}>{child.label}</Highlight>
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  };

  return (
    <div className="relative w-full" onFocus={() => setShowOptions(true)}>
      <DebouncedInput
        {...props}
        value={value}
        className="w-full"
        onChange={(e) => onChange(e)}
      />
      {loading && <Loader className="absolute right-0 top-2 me-2" size="xs" />}
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
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => {
              return (
                <TreeSelectChild key={JSON.stringify(option)} {...option} />
              );
            })}
          </div>
        </Stack>
      )}
    </div>
  );
};

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
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setShowOptions(false);
        }
      }}
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
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                title={option.label}
                className="w-full text-sm p-2 hover:bg-slate-100 cursor-pointer text-ellipsis text-nowrap overflow-x-hidden"
                tabIndex={0}
                onClick={() => {
                  onSelect(option);
                  setShowOptions(false);
                }}
              >
                <Highlight target={value}>{option.label}</Highlight>
              </div>
            ))}
          </div>
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
