import { Meta, StoryFn } from "@storybook/react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

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
    <div className="w-[25rem]">
      <img src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" />
      <div className="h-[10rem] overflow-y-scroll">
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </span>
      </div>
    </div>
    <div className="flex flex-row gap-1 justify-end mt-4">
      <Button size="sm" variant="outline">
        Cancel
      </Button>
      <Button size="sm">Confirm</Button>
    </div>
  </Card>
);

export default CardStory;
