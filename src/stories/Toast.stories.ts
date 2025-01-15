import { Meta } from "@storybook/react";
import { Toast } from "../components/Toast";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const ToastStory: Meta<typeof Toast> = {
  title: "Core/Toast",
  component: Toast,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Regular = {
  args: {},
};

export default ToastStory;
