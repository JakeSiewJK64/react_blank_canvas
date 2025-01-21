import { Meta } from "@storybook/react/*";
import { Skeleton } from "../components/Skeleton";
import "../index.css";

const SkeletonStory: Meta<typeof Skeleton> = {
  title: "Core/Skeleton",
  component: Skeleton,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

const Template = () => (
  <div className="flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

export const Regular = Template.bind({});

export default SkeletonStory;
