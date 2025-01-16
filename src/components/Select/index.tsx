import "../../index.css";

export const Select = ({
  options,
  className,
  defaultValue,
  onChange,
  value,
}: {
  value: string;
  options: { value: string; label: string }[] | string[];
  className?: string;
  defaultValue?: string;
  onChange?: (e: number | string) => void;
}) => {
  return (
    <select
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => {
        const value = e.target.value;

        if (!onChange || !value) {
          return;
        }

        onChange(value);
      }}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
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
