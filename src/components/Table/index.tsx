import {
  useReactTable,
  Table as TSTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "../../index.css";

export const Table = ({
  data = [],
  columns = [],
}: {
  data: unknown[];
  columns: ColumnDef<any, any>[];
}) => {
  const reactTable: TSTable<unknown> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
        {reactTable.getRowModel().rows.map((rowGroup) => (
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
  );
};
