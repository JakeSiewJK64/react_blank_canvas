import { Meta } from "@storybook/react/*";
import { Checkbox } from "../components/Checkbox";
import "../index.css";

const CheckboxStory: Meta<typeof Checkbox> = {
  title: "Core/Checkbox",
  component: Checkbox,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (args: typeof Checkbox) => <Checkbox {...args} />;

export const Regular = Template.bind({});

export default CheckboxStory;
