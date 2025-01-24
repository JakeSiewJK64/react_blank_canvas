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
  getFilteredRowModel,
  ColumnFiltersState,
  Column,
  RowData,
} from "@tanstack/react-table";
import { ReactElement, useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import { Loader } from "../Loader";
import { Select } from "../Select";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { cn } from "../../utils";
import { DebouncedInput, Input } from "../Input";
import { Group } from "../Group";
import { Stack } from "../Stack";
import { Checkbox } from "../Checkbox";
import { Tabs } from "../Tabs";
import "../../index.css";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType:
      | "range"
      | "string"
      | "number"
      | "select"
      | "boolean"
      | undefined;
    options?: { label: string; value: string }[];
  }
}

export type BaseAPIOptions = {
  pageSize: number;
  pageIndex: number;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
};

type TableView = { label: string; value: string[] };

const getPageRecordInfo = ({
  totalRows,
  pageIndex,
  pageSize,
}: {
  totalRows: number;
  pageIndex: number;
  pageSize: number;
}) => {
  const firstRowNum = pageIndex * pageSize + 1;
  const currLastRowNum = (pageIndex + 1) * pageSize;
  const lastRowNum = currLastRowNum < totalRows ? currLastRowNum : totalRows;
  return `${firstRowNum} - ${lastRowNum} of ${totalRows}`;
};

const ColumnFilterInput = ({ column }: { column: Column<any, unknown> }) => {
  const columnFilterValue = column.getFilterValue();
  const filterType = column.columnDef.meta?.filterType;

  if (filterType === "range") {
    return (
      <Group gap={4}>
        <DebouncedInput
          className="font-normal"
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder="Min"
        />
        <DebouncedInput
          className="font-normal"
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder="Max"
        />
      </Group>
    );
  }

  if (filterType === "select") {
    const options = column.columnDef.meta?.options;

    if (!options) {
      return null;
    }

    return (
      <Select
        value={String(columnFilterValue ?? "")}
        className="h-[2.5rem] mt-2"
        options={options}
        onChange={(e) => {
          column.setFilterValue(e.target.value);
        }}
      />
    );
  }

  return (
    <DebouncedInput
      className="font-normal"
      type="text"
      placeholder={`Search by ${column.id}`}
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e)}
    />
  );
};

const EditViewPopover = ({
  tableView,
  onUpdate = () => {},
  allViews,
}: {
  allViews: string[];
  tableView: TableView;
  onUpdate: (viewName: TableView) => void;
}) => {
  const [newTableViewName, setNewTableViewName] = useState(tableView.label);

  return (
    <Popover
      position="right"
      trigger="click"
      content={
        <Stack gap={4} className="p-2">
          <div>
            Edit <strong>{tableView.label}</strong> view
          </div>
          <Input
            value={newTableViewName}
            onChange={(e) => setNewTableViewName(e.target.value)}
            placeholder="Enter new view name"
            className="my-2"
          />
          {allViews.map((column) => {
            if (column === " ") {
              return;
            }

            return (
              <Group gap={4} key={column}>
                <Checkbox
                  defaultChecked={tableView.value.includes(column)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      tableView.value.push(column);
                    }
                  }}
                />
                <div>{column}</div>
              </Group>
            );
          })}
          <Group justify="end">
            <Button
              variant="outline"
              size="xs"
              title={`Save ${tableView.label} view`}
              onClick={() => {
                onUpdate({
                  label: newTableViewName,
                  value: tableView.value,
                });
              }}
            >
              Save
            </Button>
          </Group>
        </Stack>
      }
    >
      <Button
        title={`Edit ${tableView.label} view`}
        size="xs"
        color="secondary"
        variant="subtle"
        icon={<Monicon name="lucide:pencil" size={15} />}
      />
    </Popover>
  );
};

const DeleteViewPopover = ({
  tableView,
  onDelete = () => {},
}: {
  tableView: TableView;
  onDelete: (viewName: string) => void;
}) => {
  return (
    <Popover
      position="right"
      trigger="click"
      content={
        <div className="p-2">
          Are you sure you want to delete view{" "}
          <strong>{tableView.label}?</strong>
          <Group justify="end">
            <Button
              variant="outline"
              color="danger"
              size="xs"
              title={`Delete ${tableView.label} view`}
              onClick={() => {
                onDelete(tableView.label);
              }}
            >
              Delete View
            </Button>
          </Group>
        </div>
      }
    >
      <Button
        title={`Delete ${tableView.label} view`}
        size="xs"
        variant="outline"
        color="danger"
        icon={<Monicon name="lucide:trash-2" size={15} />}
      />
    </Popover>
  );
};

const ColumnFilter = ({ table }: { table: TSTable<unknown> }) => {
  const [viewName, setViewName] = useState("");
  const localStorageViews: TableView[] = JSON.parse(
    localStorage.getItem("columnViews") ?? "[]"
  );
  const viewExists = localStorageViews.some((col) => col.label === viewName);

  return (
    <div className="p-2">
      <Tabs
        border={false}
        tabList={[
          { key: "column_toggle", label: "Show/Hide Column" },
          { key: "saved_views", label: "Saved Views" },
        ]}
      >
        <div key="column_toggle" className="pt-2">
          <Input
            errorMessage={viewExists ? `"${viewName}" already exist.` : ""}
            value={viewName}
            placeholder="Enter view name"
            type="text"
            onChange={(e) => {
              setViewName(e.target.value);
            }}
          />
          <Stack className="my-2" gap={4}>
            {table.getAllLeafColumns().map((column) => {
              if (column.id === " ") {
                return;
              }

              return (
                <div key={column.id}>
                  <Checkbox
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    label={column.id}
                  />
                </div>
              );
            })}
          </Stack>
          <Group gap={2} justify="end">
            {!table.getIsAllColumnsVisible() && (
              <Button
                variant="outline"
                color="danger"
                title="Reset selected view"
                size="xs"
                onClick={() => {
                  table.resetColumnVisibility();
                }}
              >
                Reset View
              </Button>
            )}
            {viewName && (
              <Button
                title="Save current view"
                size="xs"
                disabled={viewExists}
                onClick={() => {
                  const visibleColumnArray = table
                    .getVisibleFlatColumns()
                    .map((col) => {
                      const columnName = col.id;

                      if (columnName !== " ") {
                        return columnName;
                      }
                    });
                  const existingViews = JSON.parse(
                    localStorage.getItem("columnViews") ?? "[]"
                  );

                  localStorage.setItem(
                    "columnViews",
                    JSON.stringify([
                      ...existingViews,
                      {
                        label: viewName,
                        value: visibleColumnArray,
                      },
                    ])
                  );
                }}
              >
                Save View
              </Button>
            )}
          </Group>
        </div>
        <div key="saved_views">
          <Stack className="mt-2" gap={4}>
            {localStorageViews.length === 0 && (
              <Stack align="center">
                <Monicon size={25} name="lucide:package-open" />
                <div className="text-sm text-center">
                  You currently have no saved views.
                </div>
              </Stack>
            )}
            {localStorageViews.map((view: TableView) => {
              return (
                <div
                  key={`${view.label}-${view.value}`}
                  className="text-sm p-1 border-b-[1px] border-slate-300"
                  id={`${view.label}-${view.value}`}
                >
                  <Group justify="space-between">
                    <div className="text-left">{view.label}</div>
                    <Group gap={2}>
                      <EditViewPopover
                        allViews={table
                          .getAllLeafColumns()
                          .map((col) => col.id)}
                        onUpdate={(newView) => {
                          const newViewCache = localStorageViews.filter(
                            (column) => column.label !== view.label
                          );

                          localStorage.setItem(
                            "columnViews",
                            JSON.stringify([...newViewCache, newView])
                          );
                        }}
                        tableView={view}
                      />
                      <Button
                        title={`Apply ${view.label} view`}
                        size="xs"
                        color="success"
                        onClick={() => {
                          // hide all columns
                          table.toggleAllColumnsVisible(false);

                          // iterate all stored columns to be visible
                          view.value.forEach((column) => {
                            if (!column) {
                              return;
                            }

                            const reactTableColumns = table.getColumn(column);

                            if (reactTableColumns) {
                              reactTableColumns.toggleVisibility(true);
                            }
                          });
                        }}
                        icon={
                          <Monicon
                            color="white"
                            name="lucide:check"
                            size={15}
                          />
                        }
                      />
                      <DeleteViewPopover
                        tableView={view}
                        onDelete={(viewName) => {
                          const filteredTableViews = localStorageViews.filter(
                            (view) => view.label !== viewName
                          );

                          localStorage.setItem(
                            "columnViews",
                            JSON.stringify(filteredTableViews)
                          );
                        }}
                      />
                    </Group>
                  </Group>
                </div>
              );
            })}
          </Stack>
        </div>
      </Tabs>
    </div>
  );
};

export const Table = ({
  data = [],
  columns = [],
  pageSizeOptions = ["5", "10", "20", "50", "100"],
  pagination = true,
  serverSideDataSource = true,
  headerFilter = true,
  stickyHeader = true,
  loading = false,
  selection = false,
  resetSelectionOnFilterChange = false,
  filter = null,
  initialPageSize = 10,
  initialPageIndex = 0,
  pageCount = 0,
  total = 0,
  onRowSelect = () => {},
  fetchData = () => {},
  className,
}: {
  /** A list of options for rows per page in the pagination dropdown. */
  pageSizeOptions?: string[];
  /** The data to display in the table. */
  data: unknown[];
  /** The total number of records available. Only applicable to server
   * side data source to display record information.
   **/
  total?: number;
  /** An array of column definitions to configure table headers and cell rendering. */
  columns: ColumnDef<any, any>[];
  /** A function to fetch data from the server. Called with options including `pageIndex`, `pageSize`, and `sorting`. */
  fetchData?: ({ pageIndex, pageSize, sorting }: BaseAPIOptions) => void;
  /** Callback for on rows selected */
  onRowSelect?: (selectedRows: unknown, isAllRowSelected: boolean) => void;
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
  /** Reset selection on filter change. */
  resetSelectionOnFilterChange?: boolean;
  /** Whether to use server-side data fetching. If `true`, `fetchData` must be provided. */
  serverSideDataSource?: boolean;
  /** Enable sticky header */
  stickyHeader?: boolean;
  /** Is row selection enabled. */
  selection?: boolean;
  /** If `false`, hide the filter inputs under column header. */
  headerFilter?: boolean;
  /** Custom filter component. */
  filter?: ReactElement | null;
  /** Class styling for table. */
  className?: string;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});

  const reactTable: TSTable<unknown> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // for client side filtering
    initialState: {
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
      },
    },
    ...(serverSideDataSource && { pageCount }),
    manualPagination: serverSideDataSource,
    manualSorting: serverSideDataSource,
    manualFiltering: serverSideDataSource,
    enableRowSelection: selection,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    columnResizeMode: "onChange",
    state: {
      columnFilters,
      sorting,
      rowSelection,
      columnVisibility,
    },
  });
  const { pageIndex, pageSize } = reactTable.getState().pagination;

  useEffect(() => {
    if (resetSelectionOnFilterChange) {
      reactTable.resetRowSelection();
    }

    fetchData({
      pageIndex,
      pageSize,
      sorting,
      columnFilters,
    });
  }, [
    pageSize,
    pageIndex,
    columnFilters,
    fetchData,
    sorting,
    resetSelectionOnFilterChange,
  ]);

  useEffect(() => {
    onRowSelect(
      reactTable.getSelectedRowModel().flatRows,
      reactTable.getIsAllRowsSelected()
    );
  }, [rowSelection, onRowSelect]);

  return (
    <table className={cn(`w-[100%] min-w-[50rem] ${className}`)}>
      <thead className={cn(`${stickyHeader && "sticky z-2 top-0"}`)}>
        <tr>
          <th colSpan={columns.length} className="font-normal">
            <Group
              gap={2}
              align="center"
              justify="space-between"
              className="bg-white"
            >
              <Group gap={2} align="center">
                <Popover
                  position="right"
                  trigger="click"
                  content={<ColumnFilter table={reactTable} />}
                >
                  <Button
                    title="Show/Hide columns"
                    size="xs"
                    color="secondary"
                    variant="outline"
                    className="border border-slate-300 px-2"
                    icon={<Monicon name="lucide:columns-2" />}
                  />
                </Popover>
                {filter && (
                  <Popover position="right" trigger="click" content={filter}>
                    <Button
                      title="Filter"
                      color="secondary"
                      size="xs"
                      variant="outline"
                      className="border border-slate-300 px-2"
                      icon={<Monicon name="lucide:filter" />}
                    />
                  </Popover>
                )}
                {columnFilters.length !== 0 && (
                  <Button
                    title="Clear current selection"
                    icon={<Monicon size={15} name="lucide:x" />}
                    size="xs"
                    variant="outline"
                    color="danger"
                    onClick={() => {
                      reactTable.resetColumnFilters();
                    }}
                  >
                    Clear Filter ({columnFilters.length} active filters)
                  </Button>
                )}
                {reactTable.getIsSomeRowsSelected() && (
                  <Button
                    title="Clear current selection"
                    icon={<Monicon size={15} name="lucide:x" />}
                    size="xs"
                    variant="outline"
                    color="danger"
                    onClick={() => {
                      reactTable.resetRowSelection();
                    }}
                  >
                    Clear Selection (
                    {reactTable.getSelectedRowModel().rows.length} selected
                    rows)
                  </Button>
                )}
              </Group>
              {pagination && (
                <Group gap={2} align="center">
                  <div className="text-sm min-w-[5rem]">Page Size: </div>
                  <Select
                    value={String(reactTable.getState().pagination.pageSize)}
                    options={pageSizeOptions}
                    onChange={(e) => {
                      reactTable.setPageSize(Number(e.target.value));
                    }}
                  />
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
                </Group>
              )}
            </Group>
          </th>
        </tr>
        {reactTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort();
              const isSorted = header.column.getIsSorted();
              const isPinned = header.column.getIsPinned();
              const canPinned = header.column.getCanPin();
              const headerTitle = flexRender(
                header.column.columnDef.header,
                header.getContext()
              );

              return (
                <th
                  style={{
                    ...(isPinned && {
                      boxShadow: "-4px 0 4px -4px gray inset",
                    }),
                    position: isPinned ? "sticky" : "relative",
                    width: header.column.getSize(),
                    zIndex: isPinned ? 1 : 0,
                    ...(isPinned === "left" && {
                      left: `${header.column.getStart("left")}px`,
                    }),
                  }}
                  key={header.id}
                  className="p-4 bg-slate-200"
                >
                  <Group gap={2} align="center" justify="space-between">
                    <span>{headerTitle}</span>
                    <Group gap={2}>
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
                      {canPinned && (
                        <div
                          title={`${
                            !isPinned ? "Pin" : "Unpin"
                          } ${headerTitle} column`}
                          className="cursor-pointer rounded-full p-1"
                          onClick={() => {
                            if (isPinned) {
                              header.column.pin(false);
                              return;
                            }

                            header.column.pin("left");
                          }}
                        >
                          <Monicon
                            size={15}
                            name={!isPinned ? "lucide:pin" : "lucide:pin-off"}
                          />
                        </div>
                      )}
                    </Group>
                  </Group>
                  <div
                    className="bg-black opacity-[0.25] w-[3px] cursor-ew-resize h-[100%] absolute right-0 top-0 touch-none select-none"
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    onDoubleClick={() => {
                      header.column.resetSize();
                    }}
                  />
                  {header.column.getCanFilter() && headerFilter && (
                    <ColumnFilterInput column={header.column} />
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {reactTable.getRowModel().rows.map((rowGroup) => (
          <tr
            key={rowGroup.id}
            className="hover:bg-slate-100 border-b-[1px] p-4"
          >
            {rowGroup.getVisibleCells().map((cell) => {
              const isPinned = cell.column.getIsPinned();

              return (
                <td
                  style={{
                    ...(isPinned && {
                      boxShadow: "-4px 0 4px -4px gray inset",
                      backgroundColor: "white",
                    }),
                    position: isPinned ? "sticky" : "relative",
                    width: cell.column.getSize(),
                    zIndex: isPinned ? 1 : 0,
                    ...(isPinned === "left" && {
                      left: `${cell.column.getStart("left")}px`,
                    }),
                  }}
                  key={cell.id}
                  className={cn(
                    `${cell.row.getIsSelected() && "bg-slate-100"}`
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="sticky z-[2] bottom-0 bg-white">
          <th colSpan={columns.length} className="font-normal">
            <Stack align="center" justify="center" className="mt-4">
              {loading && (
                <>
                  <Loader size="sm" />
                  <span>Loading...</span>
                </>
              )}
              {data.length === 0 && !loading && <span>No Data</span>}
            </Stack>
            <Group justify="space-between">
              <span>
                Total records:{" "}
                <strong>
                  {reactTable.getRowModel().rows.length.toString()}
                </strong>
              </span>
              {data.length !== 0 && (
                <span className="text-sm">
                  Showing{" "}
                  {getPageRecordInfo({
                    pageIndex,
                    pageSize,
                    totalRows: serverSideDataSource
                      ? total
                      : reactTable.getRowCount(),
                  })}{" "}
                  rows
                </span>
              )}
            </Group>
          </th>
        </tr>
      </tfoot>
    </table>
  );
};
