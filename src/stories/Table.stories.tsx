import { Meta, StoryFn } from "@storybook/react";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../components/Table";
import { Button } from "../components/Button";

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
  name: string;
  price: number;
  description: string;
}>();

export const Regular: StoryFn<typeof Table> = (args) => {
  const res = {
    count: 3,
    results: [
      {
        name: "apple",
        price: "100",
        description: "Lorem Ipsum is simply dummy text.",
      },
      {
        name: "apple pie",
        price: "200",
        description: "Lorem Ipsum has been the industry's standard.",
      },
      {
        name: "apple cider",
        price: "300",
        description: "It has survived not only five centuries.",
      },
    ],
  };

  return (
    <Table
      initialPageIndex={0}
      initialPageSize={5}
      pagination
      serverSideDataSource
      total={res.count}
      data={res.results}
      columns={[
        columnHelper.accessor("name", {
          header: "Name",
          cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor("price", {
          header: "Price",
          cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor("description", {
          header: "Description",
          cell: (info) => (
            <span className="overflow-ellipsis">{info.getValue()}</span>
          ),
        }),
        columnHelper.display({
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
