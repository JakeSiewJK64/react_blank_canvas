import Monicon from "@monicon/react";
import { ReactElement } from "react";
import { cn } from "../../utils";

const PaginationButton = ({
  children,
  title,
  active,
  onClick,
  disabled,
}: {
  children: number | string | ReactElement;
  disabled?: boolean;
  active?: boolean;
  title?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        `${active && "bg-[#09ABC2] text-white"} ${
          disabled && "opacity-[50%] cursor-not-allowed"
        } w-6 h-6 border border-slate-300 text-center rounded`
      )}
      role="button"
      title={title ?? children.toString()}
    >
      {children}
    </button>
  );
};

export const Pagination = ({
  total,
  value,
  onChange,
}: {
  onChange: (e: number) => void;
  total: number;
  value: number;
}) => {
  return (
    <div className="flex flex-row my-2 gap-1">
      <PaginationButton
        title="Previous Page"
        disabled={value === 1}
        onClick={() => {
          onChange(value - 1);
        }}
      >
        <div className="ps-[3px]">
          <Monicon name="lucide:arrow-left" size={15} />
        </div>
      </PaginationButton>
      {Array.from({
        length: total,
      }).map((_, index) => {
        const previewIndex = index + 1;

        return (
          <PaginationButton
            title={String(previewIndex)}
            active={value === previewIndex}
            key={`${index}-${Date.now()}`}
            onClick={() => {
              onChange(previewIndex);
            }}
          >
            <div className="text-sm pb-2">{previewIndex}</div>
          </PaginationButton>
        );
      })}
      <PaginationButton
        title="Next Page"
        disabled={value === total}
        onClick={() => {
          onChange(value + 1);
        }}
      >
        <div className="ps-[3px]">
          <Monicon name="lucide:arrow-right" size={15} />
        </div>
      </PaginationButton>
    </div>
  );
};
