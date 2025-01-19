import { Meta } from "@storybook/react/*";
import { Stack } from "../components/Stack";
import "../index.css";

const StackStory: Meta<typeof Stack> = {
  title: "Core/Stack",
  component: Stack,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (args: typeof Stack) => (
  <Stack justify="baseline" {...args}>
    <div className="text-white font-bold bg-kt-primary p-2 w-[25%]">
      Children 1
    </div>
    <div className="text-white font-bold bg-kt-primary p-2 w-[25%]">
      Children 2
    </div>
    <div className="text-white font-bold bg-kt-primary p-2 w-[25%]">
      Children 3
    </div>
  </Stack>
);

export const Regular = Template.bind({});

export default StackStory;
