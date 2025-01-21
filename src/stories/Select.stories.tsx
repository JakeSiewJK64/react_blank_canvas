import { Meta } from "@storybook/react/*";
import { Select } from "../components/Select";
import "../index.css";

const SelectStory: Meta<typeof Select> = {
  title: "Core/Select",
  component: Select,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (args: typeof Select) => (
  <Select
    options={[
      { label: "Apple", value: "Apple" },
      { label: "Orange", value: "Orange" },
      { label: "Watermelon", value: "Watermelon" },
    ]}
    {...args}
  />
);

export const Regular = Template.bind({});

export default SelectStory;
