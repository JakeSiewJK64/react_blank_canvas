import Monicon from "@monicon/react";
import { Meta } from "@storybook/react";
import { Button } from "../components/Button";

const ButtonStory: Meta<typeof Button> = {
  title: "Core/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export const Large = {
  args: {
    children: "Button",
    size: "lg",
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

export const Loading = {
  args: {
    size: "sm",
    loading: true,
    children: "Button",
  },
};

export const Elevated = {
  args: {
    variant: "elevated",
    children: "Button",
  },
};

export const Icon = {
  args: {
    variant: "outline",
    color: "outline",
    size: "md",
    icon: <Monicon color="white" name="lucide:x" size={15} />,
  },
};

export const ChildrenWithIcon = {
  args: {
    variant: "outline",
    color: "success",
    icon: <Monicon color="#40c057" name="lucide:check" size={15} />,
    children: "Button",
  },
};

export const DangerButton = {
  args: {
    color: "success",
    variant: "elevated",
    children: "Delete Account",
  },
};

export default ButtonStory;
