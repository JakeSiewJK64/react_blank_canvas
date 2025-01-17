import Monicon from "@monicon/react";
import {
  useReactTable,
  Table as TSTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import { Loader } from "../Loader";
import { Select } from "../Select";
import "../../index.css";

type PageInfo = {
  totalRows: number;
  pageIndex: number;
  pageSize: number;
};

export type BaseAPIOptions = {
  pageSize: number;
  pageIndex: number;
  sorting: SortingState;
};

const getPageRecordInfo = ({ totalRows, pageIndex, pageSize }: PageInfo) => {
  const firstRowNum = pageIndex * pageSize + 1;
  const currLastRowNum = (pageIndex + 1) * pageSize;
  const lastRowNum = currLastRowNum < totalRows ? currLastRowNum : totalRows;
  return `Viewing ${firstRowNum} - ${lastRowNum} of ${totalRows}`;
};

export const getPageCount = ({
  totalRows,
  pageSize,
}: Omit<PageInfo, "pageIndex">) => {
  return Math.ceil(totalRows / pageSize);
};

export const Table = ({
  data = [],
  columns = [],
  pagination = true,
  serverSideDataSource = true,
  total = 0,
  initialPageSize = 10,
  initialPageIndex = 0,
  fetchData = () => {},
  pageCount = 0,
  loading = false,
  pageSizeOptions = ["5", "10", "20", "50", "100"],
}: {
  pageSizeOptions?: string[];
  loading?: boolean;
  pageCount?: number;
  fetchData?: ({ pageIndex, pageSize, sorting }: BaseAPIOptions) => void;
  initialPageSize?: number;
  initialPageIndex?: number;
  total?: number;
  pagination?: boolean;
  data: unknown[];
  columns: ColumnDef<any, any>[];
  serverSideDataSource?: boolean;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const reactTable: TSTable<unknown> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
      },
    },
    ...(serverSideDataSource && { pageCount, autoResetPageIndex: true }),
    manualPagination: serverSideDataSource,
    manualSorting: serverSideDataSource,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });
  const { pageIndex, pageSize } = reactTable.getState().pagination;

  useEffect(() => {
    fetchData({
      pageIndex,
      pageSize,
      sorting,
    });
  }, [pageSize, pageIndex, fetchData, sorting]);

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
              {getPageRecordInfo({
                pageIndex,
                pageSize,
                totalRows: serverSideDataSource
                  ? total
                  : reactTable.getRowModel().rows.length,
              })}
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
          {(pagination
            ? reactTable.getPaginationRowModel()
            : reactTable.getRowModel()
          ).rows.map((rowGroup) => (
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
      <span>
        Total records: <strong>{reactTable.getRowCount()}</strong>
      </span>
      <div className="mt-4 flex flex-col items-center justify-center">
        {loading && (
          <>
            <Loader size="sm" />
            <span>Loading...</span>
          </>
        )}
        {data.length === 0 && !loading && <span>No Data</span>}
      </div>
    </div>
  );
};
