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
  offset = 7,
}: {
  onChange: (e: number) => void;
  total: number;
  value: number;
  offset?: number;
}) => {
  if (total === 0) {
    return null;
  }

  const getIntermediaryPages = () => {
    const createButtons = (start: number, count: number) => {
      return Array.from({ length: count }).map((_, index) => {
        const pageIndex = start + index;

        return (
          <PaginationButton
            key={pageIndex}
            title={String(pageIndex)}
            disabled={value === pageIndex}
            active={value === pageIndex}
            onClick={() => onChange(pageIndex)}
          >
            <div className="text-sm">{pageIndex}</div>
          </PaginationButton>
        );
      });
    };

    // case 1: Total pages are less than the offset
    if (total < offset) {
      return createButtons(1, total - 1);
    }

    // case 2: Current page is near the end
    if (value + offset > total) {
      const start = total - offset;
      return (
        <>
          <div className="pt-1">
            <Monicon name="lucide:ellipsis" />
          </div>
          {createButtons(start, offset)}
        </>
      );
    }

    // case 3: Current page is near the beginning
    if (value - offset < 1) {
      return (
        <>
          {createButtons(2, offset - 1)}
          <div className="pt-1">
            <Monicon name="lucide:ellipsis" />
          </div>
        </>
      );
    }

    // case 4: Current page is somewhere in the middle
    if (value > offset && value <= total - offset) {
      const start = value - Math.floor(offset / 2);
      return (
        <>
          <div className="pt-1">
            <Monicon name="lucide:ellipsis" />
          </div>
          {createButtons(start, offset)}
          <div className="pt-1">
            <Monicon name="lucide:ellipsis" />
          </div>
        </>
      );
    }

    return null;
  };

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
      <PaginationButton
        title="1"
        active={value === 1}
        disabled={value === 1}
        onClick={() => {
          onChange(1);
        }}
      >
        <div className="text-sm pb-2">1</div>
      </PaginationButton>
      {getIntermediaryPages()}
      <PaginationButton
        disabled={value === total}
        title={String(total)}
        active={value === total}
        onClick={() => {
          onChange(total);
        }}
      >
        <div className="text-sm pb-2">{total}</div>
      </PaginationButton>
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
