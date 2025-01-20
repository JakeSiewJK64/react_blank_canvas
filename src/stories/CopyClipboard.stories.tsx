import { Meta } from "@storybook/react/*";
import { CopyClipboard } from "../components/CopyClipboard";
import "../index.css";

const CopyClipboardStory: Meta<typeof CopyClipboard> = {
  title: "Core/CopyClipboard",
  component: CopyClipboard,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (args: { text: string }) => <CopyClipboard text={args.text} />;

export const Regular = Template.bind({});

export default CopyClipboardStory;
