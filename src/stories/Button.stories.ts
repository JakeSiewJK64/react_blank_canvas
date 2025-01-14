import { Meta } from "@storybook/react";
import { Button } from "../components/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const ButtonStory: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "warn", "danger", "success"],
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Large = {
  args: {
    size: "lg",
    children: "Button",
  },
};

export const Regular = {
  args: {
    color: "primary",
    children: "Button",
  },
};

export const Small = {
  args: {
    size: "sm",
    children: "Button",
  },
};

export default ButtonStory;
