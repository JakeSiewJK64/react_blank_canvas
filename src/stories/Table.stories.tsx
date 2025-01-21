import { Meta, StoryFn } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { BaseAPIOptions, Table } from "../components/Table";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Stack } from "../components/Stack";

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
}>();

/**
 * **references:**
 *
 * [react table sorting](https://stackoverflow.com/a/74977394)
 *
 * */
export const ClientSideTable: StoryFn<typeof Table> = (args) => {
  const [tableValuePreview, setTableValuePreview] = useState({});
  const total = 20;
  const res = {
    data: Array.from({ length: total }).map((_, index) => ({
      fact: `fact ${index}`,
      length: 10 * index,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    })),
  };
  const fetchData = useCallback((e: object) => {
    setTableValuePreview(e);
  }, []);

  return (
    <Stack>
      <pre className="bg-slate-200 rounded p-2">
        {JSON.stringify(tableValuePreview, null, 2)}
      </pre>
      <Table
        serverSideDataSource={false}
        pagination
        initialPageSize={total}
        initialPageIndex={0}
        {...args}
        data={res.data}
        fetchData={fetchData}
        columns={[
          columnHelper.accessor("fact", {
            header: "Fact",
            enableSorting: false,
            cell: (info) => <span>{info.getValue()}</span>,
          }),
          columnHelper.accessor("length", {
            header: "Length",
            meta: {
              filterType: "range",
            },
            cell: (info) => <span>{info.getValue()}</span>,
          }),
          columnHelper.accessor("description", {
            header: "Description",
            cell: (info) => <span>{info.getValue()}</span>,
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

export const PinColumnTable: StoryFn<typeof Table> = (args) => {
  const total = 10;
  const res = {
    data: Array.from({ length: total }).map((_, index) => ({
      fact: `fact ${index}`,
      length: 10 * index,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    })),
  };

  return (
    <div className="flex justify-center">
      <div className="w-[75%]">
        <Table
          serverSideDataSource={false}
          pagination
          initialPageSize={total}
          initialPageIndex={0}
          {...args}
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
            columnHelper.accessor("description", {
              header: "Length",
              cell: (info) => <span>{info.getValue()}</span>,
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
      </div>
    </div>
  );
};

export const Filter: StoryFn<typeof Table> = (args) => {
  const total = 10;
  const res = {
    data: Array.from({ length: total }).map((_, index) => ({
      fact: `fact ${index}`,
      length: 10 * index,
    })),
  };
  const FilterComponent = ({
    onChange = () => {},
  }: {
    onChange: (e: unknown) => void;
  }) => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChange(e.target);
        }}
      >
        <div className="flex flex-row gap-2 items-center w-[30rem]">
          <Input label="First Name" placeholder="First Name" />
          <Input label="Last Name" placeholder="Last Name" />
        </div>
        <Button
          className="my-2 ms-auto"
          type="submit"
          size="sm"
          variant="destructive"
        >
          Submit
        </Button>
      </form>
    );
  };

  return (
    <Table
      filter={<FilterComponent onChange={(e) => console.log(e)} />}
      serverSideDataSource={false}
      pagination
      initialPageSize={total}
      initialPageIndex={0}
      {...args}
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
          id: "action",
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

export const SelectTable: StoryFn<typeof Table> = (args) => {
  const total = 10;
  const res = {
    data: Array.from({ length: total }).map((_, index) => ({
      fact: `fact ${index}`,
      length: 10 * index,
    })),
  };

  return (
    <Table
      serverSideDataSource={false}
      pagination
      initialPageSize={total}
      initialPageIndex={0}
      onRowSelect={(e) => console.log(e)}
      data={res.data}
      selection
      columns={[
        columnHelper.display({
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

export default TableStory;
