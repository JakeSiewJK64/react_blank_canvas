import { Meta, StoryFn } from "@storybook/react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Anchor } from "../components/Anchor";

const BreadcrumbsStory: Meta<typeof Breadcrumbs> = {
  title: "Core/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export const Regular: StoryFn<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args}>
    <Anchor href="#">Link 1</Anchor>
    <Anchor href="#">Link 2</Anchor>
    <span>Text 3</span>
  </Breadcrumbs>
);

export const CustomSeparator: StoryFn<typeof Breadcrumbs> = (_) => (
  <Breadcrumbs separator="➜">
    <Anchor href="#">Link 1</Anchor>
    <Anchor href="#">Link 2</Anchor>
    <span>Text 3</span>
  </Breadcrumbs>
);

export default BreadcrumbsStory;
