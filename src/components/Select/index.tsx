import { SelectHTMLAttributes } from "react";
import "../../index.css";

export const Select = ({
  options,
  ...props
}: {
  options: { value: string; label: string }[] | string[];
} & SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      {...props}
      className={`px-2 w-fit h-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none block dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 ${props.className}`}
    >
      {options.map((option) => {
        if (typeof option === "string") {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        }

        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
