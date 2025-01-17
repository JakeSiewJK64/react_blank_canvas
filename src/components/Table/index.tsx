import Monicon from "@monicon/react";
import {
  useReactTable,
  Table as TSTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { HTMLProps, useEffect, useRef, useState } from "react";
import { Pagination } from "../Pagination";
import { Loader } from "../Loader";
import { Select } from "../Select";
import "../../index.css";

export type BaseAPIOptions = {
  pageSize: number;
  pageIndex: number;
  sorting: SortingState;
  rowSelection: object;
};

export const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
};

export const Table = ({
  data = [],
  columns = [],
  pageSizeOptions = ["5", "10", "20", "50", "100"],
  pagination = true,
  serverSideDataSource = true,
  loading = false,
  selection = false,
  initialPageSize = 10,
  initialPageIndex = 0,
  pageCount = 0,
  total = 0,
  onRowSelect = () => {},
  fetchData = () => {},
}: {
  /** A list of options for rows per page in the pagination dropdown. */
  pageSizeOptions?: string[];
  /** The data to display in the table. */
  data: unknown[];
  /** The total number of records available. This is useful for pagination calculations. */
  total?: number;
  /** An array of column definitions to configure table headers and cell rendering. */
  columns: ColumnDef<any, any>[];
  /** A function to fetch data from the server. Called with options including `pageIndex`, `pageSize`, and `sorting`. */
  fetchData?: ({
    pageIndex,
    pageSize,
    sorting,
    rowSelection,
  }: BaseAPIOptions) => void;
  /** Callback for on rows selected */
  onRowSelect?: (selectedRows: unknown) => void;
  /** The total number of pages available (used for server-side pagination). */
  pageCount?: number;
  /** The initial number of rows displayed per page. */
  initialPageSize?: number;
  /** The initial page index (0-based) when the table loads. */
  initialPageIndex?: number;
  /** Whether the table is in a loading state, displaying a loading indicator. */
  loading?: boolean;
  /** Whether pagination is enabled for the table. */
  pagination?: boolean;
  /** Whether to use server-side data fetching. If `true`, `fetchData` must be provided. */
  serverSideDataSource?: boolean;
  /** is row selection enabled. */
  selection?: boolean;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const reactTable: TSTable<unknown> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
      },
    },
    ...(serverSideDataSource && { pageCount }),
    manualPagination: serverSideDataSource,
    manualSorting: serverSideDataSource,
    onSortingChange: setSorting,
    enableRowSelection: selection,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });
  const { pageIndex, pageSize } = reactTable.getState().pagination;

  useEffect(() => {
    fetchData({
      pageIndex,
      pageSize,
      sorting,
      rowSelection,
    });
  }, [pageSize, pageIndex, fetchData, sorting]);

  useEffect(() => {
    onRowSelect(reactTable.getSelectedRowModel().flatRows);
  }, [rowSelection, onRowSelect]);

  return (
    <div>
      {pagination && (
        <div className="flex flex-row gap-2 items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-[8rem] text-sm">Page Size: </div>
            <Select
              value={String(reactTable.getState().pagination.pageSize)}
              className="w-[10rem] my-2"
              options={pageSizeOptions}
              onChange={(pageSize) => {
                reactTable.setPageSize(Number(pageSize));
              }}
            />
          </div>
          <div className="flex flex-row gap-4 items-center">
            <span className="text-sm">
              Showing {reactTable.getRowModel().rows.length.toLocaleString()}
              {" - "}
              {serverSideDataSource
                ? total
                : reactTable.getRowCount().toLocaleString()}{" "}
              Rows
            </span>
            <Pagination
              onFirstPage={() => {
                reactTable.firstPage();
              }}
              onLastPage={() => {
                reactTable.lastPage();
              }}
              pageCount={reactTable.getPageCount()}
              onNextPage={() => reactTable.nextPage()}
              onPreviousPage={() => reactTable.previousPage()}
              disableNext={!reactTable.getCanNextPage()}
              disablePrevious={!reactTable.getCanPreviousPage()}
              value={reactTable.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                reactTable.setPageIndex(Number(e) - 1);
              }}
            />
          </div>
        </div>
      )}
      <table className="w-[100%] min-w-[50rem]">
        <thead className="bg-slate-200 rounded-md">
          {reactTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const isSorted = header.column.getIsSorted();
                const headerTitle = flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                );

                return (
                  <th key={header.id} className="p-4">
                    <div className="flex flex-row gap-2 items-center justify-between">
                      <span>{headerTitle}</span>
                      {canSort && (
                        <button
                          title={`Sort by ${headerTitle}`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {isSorted ? (
                            <div
                              className={`transform transition-transform duration-300 ${
                                header.column.getIsSorted() === "asc"
                                  ? "rotate-0"
                                  : "rotate-180"
                              }`}
                            >
                              <Monicon name="lucide:arrow-up" size={15} />
                            </div>
                          ) : (
                            <Monicon name="lucide:arrow-up-down" size={15} />
                          )}
                        </button>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {reactTable.getRowModel().rows.map((rowGroup) => (
            <tr key={rowGroup.id} className="hover:bg-slate-100">
              {rowGroup.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className="p-4 border-b-[1px] border-slate-400"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex flex-col items-center justify-center">
        {loading && (
          <>
            <Loader size="sm" />
            <span>Loading...</span>
          </>
        )}
        {data.length === 0 && !loading && <span>No Data</span>}
      </div>
      <span>
        Total records:{" "}
        <strong>{reactTable.getRowModel().rows.length.toLocaleString()}</strong>
      </span>
    </div>
  );
};
