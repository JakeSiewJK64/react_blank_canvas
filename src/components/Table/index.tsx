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
import { ReactElement, useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import { Loader } from "../Loader";
import { Select } from "../Select";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { cn } from "../../utils";
import "../../index.css";

export type BaseAPIOptions = {
  pageSize: number;
  pageIndex: number;
  sorting: SortingState;
  rowSelection: object;
};

const ColumnFilter = ({ table }: { table: TSTable<unknown> }) => {
  return (
    <>
      <div className="flex flex-column justify-between w-[15rem] items-center">
        <span>Show/Hide Column</span>
        <Button
          onClick={() => {
            table.resetColumnVisibility();
          }}
          size="sm"
          variant="outline"
        >
          Reset
        </Button>
      </div>
      {table.getAllLeafColumns().map((column) => {
        if (column.id === " ") {
          return;
        }

        return (
          <div key={column.id} className="px-1">
            <label>
              <input
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                type="checkbox"
              />{" "}
              {column.id}
            </label>
          </div>
        );
      })}
    </>
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
  filterable = true,
  filter = null,
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
  /** The total number of records available. Only applicable to server side data source. */
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
  /** show filter component. */
  filterable?: boolean;
  /** filter component. */
  filter?: ReactElement | null;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});

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
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
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
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Popover
            position="right"
            trigger="click"
            content={<ColumnFilter table={reactTable} />}
          >
            <div
              role="button"
              title="Show/Hide columns"
              className="rounded border p-1 mb-2 border-slate-300"
            >
              <Monicon name="lucide:columns-2" />
            </div>
          </Popover>
          {filterable && filter && (
            <Popover position="right" trigger="click" content={<>{filter}</>}>
              <div
                role="button"
                title="Show/Hide columns"
                className="rounded border p-1 mb-2 border-slate-300"
              >
                <Monicon name="lucide:filter" />
              </div>
            </Popover>
          )}
        </div>
        {pagination && (
          <div className="flex flex-row gap-1 items-center">
            <div className="text-sm min-w-[5rem]">Page Size: </div>
            <Select
              value={String(reactTable.getState().pagination.pageSize)}
              className="my-2"
              options={pageSizeOptions}
              onChange={(pageSize) => {
                reactTable.setPageSize(Number(pageSize));
              }}
            />
            <div className="flex flex-row gap-4 items-center">
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
      </div>
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
                    className={cn(
                      `p-4 border-b-[1px] border-slate-400 ${
                        cell.row.getIsSelected() && "bg-slate-100"
                      }`
                    )}
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
      <div className="flex flex-row justify-between">
        <span>
          Total records:{" "}
          <strong>
            {reactTable.getRowModel().rows.length.toLocaleString()}
          </strong>
        </span>
        <span className="text-sm">
          Showing {reactTable.getRowModel().rows.length.toLocaleString()}
          {" - "}
          {serverSideDataSource
            ? total
            : reactTable.getRowCount().toLocaleString()}{" "}
          Rows
        </span>
      </div>
    </div>
  );
};
