import { Meta } from "@storybook/react";
import { Badge } from "../components/Badge";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const BadgeStory: Meta<typeof Badge> = {
  title: "Core/Badge",
  component: Badge,
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
    children: "Badge",
  },
};

export const RegularDanger = {
  args: {
    color: "danger",
  },
};

/** Small Badge */
export const Small = {
  args: { size: "sm" },
};
/** Small Badge */
export const WithCloseButton = {
  args: { withClose: true },
};
/** Large Badge */
export const Large = {
  args: { size: "lg" },
};
/** Extra large Badge */
export const ExtraLarge = {
  args: { size: "xl" },
};
export const Outline = {
  args: { size: "xs", color: "outline", variant: "outline" },
};

export default BadgeStory;
