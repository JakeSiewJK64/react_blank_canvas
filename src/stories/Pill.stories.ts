import { Meta } from "@storybook/react";
import { Pill } from "../components/Pill";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const PillStory: Meta<typeof Pill> = {
  title: "Core/Pill",
  component: Pill,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export const Regular = {
  args: {
    children: "Pill",
  },
};

export const RegularDanger = {
  args: {
    color: "danger",
  },
};

/** Small Pill */
export const Small = {
  args: { size: "sm" },
};
/** Small Pill */
export const WithCloseButton = {
  args: { withClose: true },
};
/** Large Pill */
export const Large = {
  args: { size: "lg" },
};
/** Extra large pill */
export const ExtraLarge = {
  args: { size: "xl" },
};

export default PillStory;
