import { Meta, StoryFn } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { BaseAPIOptions, Table } from "../components/Table";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Stack } from "../components/Stack";
import { Badge } from "../components/Badge";

const TableStory: Meta<typeof Table> = {
  title: "Core/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

const columnHelper = createColumnHelper<{
  fact: string;
  length: number;
  description: string;
  status: "active" | "inactive";
}>();

/**
 * **references:**
 *
 * [react table sorting](https://stackoverflow.com/a/74977394)
 *
 * */
export const ClientSideTable: StoryFn<typeof Table> = (args) => {
  const total = 20;
  const res = {
    data: Array.from({ length: total }).map((_, index) => ({
      fact: `fact ${index}`,
      length: 10 * index,
      status: index % 2 ? "active" : "inactive",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    })),
  };

  return (
    <Stack className="resize overflow-auto w-[60vw] h-[50rem]">
      <Table
        serverSideDataSource={false}
        pagination
        initialPageSize={total}
        initialPageIndex={0}
        {...args}
        data={res.data}
        fetchData={(e) => console.log(e)}
        selection
        onRowSelect={(e) => console.log(e)}
        columns={[
          columnHelper.display({
            size: 10,
            id: "select",
            header: ({ table }) => (
              <Checkbox
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onChange={row.getToggleSelectedHandler()}
              />
            ),
          }),
          columnHelper.accessor("fact", {
            header: "Fact",
            size: 100,
            enableSorting: false,
            cell: (info) => <span>{info.getValue()}</span>,
          }),
          columnHelper.accessor("length", {
            header: "Length",
            size: 1000,
            meta: {
              filterType: "range",
            },
            cell: (info) => <span>{info.getValue()}</span>,
          }),
          columnHelper.accessor("description", {
            header: "Description",
            size: 1000,
            cell: (info) => <span>{info.getValue()}</span>,
          }),
          columnHelper.accessor("status", {
            header: "Status",
            filterFn: "equals",
            meta: {
              filterType: "select",
              options: [
                {
                  label: "Active",
                  value: "active",
                },
                {
                  label: "Inactive",
                  value: "inactive",
                },
              ],
            },
            cell: (info) => (
              <div>
                <Badge
                  size="xs"
                  color={info.getValue() === "inactive" ? "danger" : "success"}
                >
                  {info.getValue()}
                </Badge>
              </div>
            ),
          }),
          columnHelper.display({
            enableSorting: false,
            enablePinning: false,
            header: " ",
            cell: () => (
              <Button size="sm" variant="outline">
                Action
              </Button>
            ),
          }),
        ]}
      />
    </Stack>
  );
};

export const ServerSideTable: StoryFn<typeof Table> = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const obj = new URLSearchParams();
      obj.append("page", page.toString());
      obj.append("limit", pageSize.toString());

      const response = await fetch(
        `https://catfact.ninja/facts?limit=${pageSize}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [page, pageSize]);

  const res = {
    count: data?.total ?? 0,
    data: data?.data ?? [],
  };

  const fetchData = useCallback((args: BaseAPIOptions) => {
    setPageSize(args.pageSize);
    setPage(args.pageIndex + 1);

    console.log(args.sorting);
  }, []);

  return (
    <Table
      total={res.count}
      fetchData={fetchData}
      pagination
      loading={loading}
      pageCount={Math.ceil(res.count / pageSize)}
      initialPageSize={pageSize}
      initialPageIndex={page - 1}
      data={res.data}
      columns={[
        columnHelper.accessor("fact", {
          header: "Fact",
          enableSorting: false,
          cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor("length", {
          header: "Length",
          cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.display({
          enableSorting: false,
          header: " ",
          cell: () => (
            <Button size="sm" variant="outline">
              Action
            </Button>
          ),
        }),
      ]}
    />
  );
};

export const Loading: StoryFn<typeof Table> = () => {
  return (
    <Table
      pagination
      serverSideDataSource
      data={[]}
      loading
      columns={[
        columnHelper.accessor("fact", {
          header: "Fact",
          enableSorting: false,
          cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor("length", {
          header: "Length",
          cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.display({
          enableSorting: false,
          header: " ",
          cell: () => (
            <Button size="sm" variant="outline">
              Action
            </Button>
          ),
        }),
      ]}
    />
  );
};

export const Empty: StoryFn<typeof Table> = () => {
  return (
    <Table
      pagination
      serverSideDataSource
      data={[]}
      columns={[
        columnHelper.accessor("fact", {
          header: "Fact",
          enableSorting: false,
          cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor("length", {
          header: "Length",
          cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.display({
          enableSorting: false,
          header: " ",
          cell: () => (
            <Button size="sm" variant="outline">
              Action
            </Button>
          ),
        }),
      ]}
    />
  );
};

export default TableStory;
