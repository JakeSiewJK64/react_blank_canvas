import { Meta } from "@storybook/react/*";
import { Pagination } from "../components/Pagination";
import "../index.css";

const PaginationStory: Meta<typeof Pagination> = {
  title: "Core/Pagination",
  component: Pagination,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

export const Regular = {
  args: {},
};

export default PaginationStory;
