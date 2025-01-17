import { Meta, StoryFn } from "@storybook/react";
import { createColumnHelper } from "@tanstack/react-table";
import { BaseAPIOptions, Table } from "../components/Table";
import { Button } from "../components/Button";
import { useCallback, useEffect, useState } from "react";

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
}>();

/**
 * **references:**
 *
 * [react table sorting](https://stackoverflow.com/a/74977394)
 *
 * */
export const ClientSideTable: StoryFn<typeof Table> = (args) => {
  const pageSize = 10;
  const total = args.total ?? 0;
  const res = {
    count: total,
    data: Array.from({ length: total }).map((_, index) => ({
      fact: `fact ${index}`,
      length: 10 * index,
    })),
  };

  return (
    <Table
      serverSideDataSource={false}
      pagination
      total={res.count}
      initialPageSize={pageSize}
      initialPageIndex={0}
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

export const ServerSideTable: StoryFn<typeof Table> = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("length");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
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
  }, [page, pageSize, sort]);

  const res = {
    count: data?.total ?? 0,
    data: data?.data ?? [],
  };

  const fetchData = useCallback((args: BaseAPIOptions) => {
    setPageSize(args.pageSize);
    setPage(args.pageIndex + 1);
  }, []);

  return (
    <Table
      fetchData={fetchData}
      pagination
      loading={loading}
      total={res.count}
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

export default TableStory;
