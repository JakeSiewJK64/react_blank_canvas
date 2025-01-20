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
import { Input } from "../Input";
import { Group } from "../Group";
import { Stack } from "../Stack";
import { Checkbox } from "../Checkbox";
import { Tabs } from "../Tabs";
import "../../index.css";

export type BaseAPIOptions = {
  pageSize: number;
  pageIndex: number;
  sorting: SortingState;
  rowSelection: object;
};

type TableView = { label: string; value: string[] };

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
          {allViews.map((column) => (
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
          ))}
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
        variant="outline"
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
              variant="destructive"
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
        variant="destructive"
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
          { id: "column_toggle", label: "Show/Hide Column" },
          { id: "saved_views", label: "Saved Views" },
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
            <Button
              variant="destructive"
              title="Reset selected view"
              size="xs"
              onClick={() => {
                table.resetColumnVisibility();
              }}
            >
              Reset View
            </Button>
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
                  className="text-sm p-1 border-b-2 border-slate-300"
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
                        className="bg-green-600"
                        size="xs"
                        variant="outline"
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
  className,
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
  /** class styling for table. */
  className?: string;
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
      <Group gap={2} align="center" justify="space-between">
        <Group gap={2} align="center">
          <Popover
            position="right"
            trigger="click"
            content={<ColumnFilter table={reactTable} />}
          >
            <Button
              title="Show/Hide columns"
              size="xs"
              variant="outline"
              className="border border-slate-300 px-2"
              icon={<Monicon name="lucide:columns-2" />}
            />
          </Popover>
          {filterable && filter && (
            <Popover position="right" trigger="click" content={<>{filter}</>}>
              <Button
                title="Filter"
                size="xs"
                variant="outline"
                className="border border-slate-300 px-2"
                icon={<Monicon name="lucide:filter" />}
              />
            </Popover>
          )}
          {reactTable.getIsSomeRowsSelected() && (
            <Button
              title="Clear current selection"
              icon={<Monicon size={15} name="lucide:x" />}
              size="xs"
              variant="destructive"
              onClick={() => {
                reactTable.resetRowSelection();
              }}
            >
              Clear Selection ({reactTable.getSelectedRowModel().rows.length}{" "}
              selected rows)
            </Button>
          )}
        </Group>
        {pagination && (
          <Group gap={2} align="center">
            <div className="text-sm min-w-[5rem]">Page Size: </div>
            <Select
              value={String(reactTable.getState().pagination.pageSize)}
              className="my-2"
              options={pageSizeOptions}
              onChange={(e) => {
                reactTable.setPageSize(Number(e.target.value));
              }}
            />
            <Group gap={4} align="center">
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
          </Group>
        )}
      </Group>
      <table className={cn(`w-[100%] min-w-[50rem] ${className}`)}>
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
                    <Group gap={2} align="center" justify="space-between">
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
                    </Group>
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
      </Group>
    </div>
  );
};
