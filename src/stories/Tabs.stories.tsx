import { Meta } from "@storybook/react/*";
import { Tabs } from "../components/Tabs";
import "../index.css";

const TabsStory: Meta<typeof Tabs> = {
  title: "Core/Tabs",
  component: Tabs,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (args: typeof Tabs) => (
  <Tabs
    {...args}
    tabList={[
      {
        id: "tab-1",
        label: "Tab 1",
      },
      {
        id: "tab-2",
        label: "Tab 2",
      },
    ]}
  >
    <div key="tab-1">my tab 1</div>
    <div key="tab-2">my tab 2</div>
  </Tabs>
);

export const Regular = Template.bind({});

export default TabsStory;
