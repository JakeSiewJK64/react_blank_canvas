import {
  useReactTable,
  Table as TSTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Pagination } from "../Pagination";
import { Select } from "../Select";
import "../../index.css";

type PageInfo = {
  totalRows: number;
  pageIndex: number;
  pageSize: number;
};

const getPageRecordInfo = ({ totalRows, pageIndex, pageSize }: PageInfo) => {
  const firstRowNum = pageIndex * pageSize + 1;
  const currLastRowNum = (pageIndex + 1) * pageSize;
  const lastRowNum = currLastRowNum < totalRows ? currLastRowNum : totalRows;
  return `Page ${firstRowNum} - ${lastRowNum} of ${totalRows}`;
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
}: {
  initialPageSize?: number;
  initialPageIndex?: number;
  total?: number;
  pagination?: boolean;
  data: unknown[];
  columns: ColumnDef<any, any>[];
  serverSideDataSource?: boolean;
}) => {
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
  });
  const { pageIndex, pageSize } = reactTable.getState().pagination;

  return (
    <div>
      {pagination && (
        <div className="flex flex-row gap-2 items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-[8rem] text-sm">Page Size: </div>
            <Select
              value={String(reactTable.getState().pagination.pageSize)}
              onChange={(pageSize) => {
                reactTable.setPageSize(Number(pageSize));
              }}
              className="w-[10rem]"
              options={["1", "5", "10", "15"]}
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
              value={reactTable.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                reactTable.setPageIndex(Number(e) - 1);
              }}
              total={getPageCount({
                pageSize,
                totalRows: serverSideDataSource
                  ? total
                  : reactTable.getRowModel().rows.length,
              })}
            />
          </div>
        </div>
      )}
      <table className="table-auto p-4 border-collapse border border-slate-400">
        <thead className="bg-slate-200">
          {reactTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="p-4 border-collapse border border-slate-400"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                    className="p-4 border-collapse border border-slate-400"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
