import { Meta, StoryFn } from "@storybook/react";
import { Card } from "../components/Card";

const CardStory: Meta<typeof Card> = {
  title: "Example/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export const Regular: StoryFn<typeof Card> = (args) => (
  <Card {...args}>
    <span>somethign</span>
  </Card>
);

export default CardStory;
