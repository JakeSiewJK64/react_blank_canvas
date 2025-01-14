import { Meta } from "@storybook/react";
import { Anchor } from "../components/Anchor";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const AnchorStory: Meta<typeof Anchor> = {
  title: "Example/Anchor",
  component: Anchor,
  render: () => <Anchor href="#">Link</Anchor>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Regular = {
  args: {},
};

export default AnchorStory;
