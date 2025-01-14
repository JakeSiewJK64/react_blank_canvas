import { Meta, StoryFn } from "@storybook/react";
import { Anchor } from "../components/Anchor";

const AnchorStory: Meta<typeof Anchor> = {
  title: "Example/Anchor",
  component: Anchor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export const Regular: StoryFn<typeof Anchor> = (_) => (
  <Anchor href="#">Link</Anchor>
);

export default AnchorStory;
