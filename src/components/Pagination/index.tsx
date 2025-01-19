import Monicon from "@monicon/react";
import { ReactElement } from "react";
import { cn } from "../../utils";
import { Group } from "../Group";

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
  value,
  onChange,
  pageCount,
  offset = 7,
  disableNext = false,
  disablePrevious = false,
  onFirstPage = () => {},
  onLastPage = () => {},
  onNextPage = () => {},
  onPreviousPage = () => {},
}: {
  onChange: (e: number) => void;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  onFirstPage?: () => void;
  onLastPage?: () => void;
  value: number;
  pageCount: number;
  offset?: number;
  disableNext?: boolean;
  disablePrevious?: boolean;
}) => {
  if (pageCount === 0) {
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
    if (pageCount < offset) {
      return createButtons(1, pageCount);
    }

    // case 2: Current page is near the end
    if (value + offset > pageCount) {
      const start = pageCount - offset + 1;

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
          {createButtons(1, offset)}
          <div className="pt-1">
            <Monicon name="lucide:ellipsis" />
          </div>
        </>
      );
    }

    // case 4: Current page is somewhere in the middle
    if (value > offset && value <= pageCount - offset) {
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
    <Group gap={1} className="my-2">
      <PaginationButton
        title="First Page"
        disabled={disablePrevious}
        onClick={() => onFirstPage()}
      >
        <div className="ps-[3px]">
          <Monicon name="lucide:chevrons-left" size={15} />
        </div>
      </PaginationButton>
      <PaginationButton
        title="Previous Page"
        disabled={disablePrevious}
        onClick={() => {
          onPreviousPage();
        }}
      >
        <div className="ps-[3px]">
          <Monicon name="lucide:arrow-left" size={15} />
        </div>
      </PaginationButton>
      {getIntermediaryPages()}
      <PaginationButton
        title="Next Page"
        disabled={disableNext}
        onClick={() => {
          onNextPage();
        }}
      >
        <div className="ps-[3px]">
          <Monicon name="lucide:arrow-right" size={15} />
        </div>
      </PaginationButton>
      <PaginationButton
        title="Last Page"
        disabled={disableNext}
        onClick={() => onLastPage()}
      >
        <div className="ps-[3px]">
          <Monicon name="lucide:chevrons-right" size={15} />
        </div>
      </PaginationButton>
    </Group>
  );
};
