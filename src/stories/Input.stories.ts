import { Meta } from "@storybook/react";
import { HTMLInputTypeAttribute } from "react";
import { Input } from "../components/Input";

const InputTypesOptions: HTMLInputTypeAttribute[] = [
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week",
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const InputStory: Meta<typeof Input> = {
  title: "Core/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: "select",
      options: InputTypesOptions,
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Small = {
  args: {
    label: "Input",
  },
};

export default InputStory;
