import { Meta } from "@storybook/react/*";
import { Group } from "../components/Group";
import "../index.css";

const GroupStory: Meta<typeof Group> = {
  title: "Core/Group",
  component: Group,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (args: typeof Group) => (
  <Group {...args}>
    <div className="text-white font-bold bg-kt-primary p-2 w-[25%]">
      Children 1
    </div>
    <div className="text-white font-bold bg-kt-primary p-2 w-[25%]">
      Children 2
    </div>
    <div className="text-white font-bold bg-kt-primary p-2 w-[25%]">
      Children 3
    </div>
  </Group>
);

export const Regular = Template.bind({});

export default GroupStory;
