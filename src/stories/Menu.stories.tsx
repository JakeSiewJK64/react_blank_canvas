import { Meta } from "@storybook/react/*";
import { Menu, MenuButton } from "../components/Menu";
import { Button } from "../components/Button";
import "../index.css";

const MenuStory: Meta<typeof Menu> = {
  title: "Core/Menu",
  component: Menu,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

export const Regular = () => (
  <Menu
    position="right"
    target={
      <Button variant="outline" color="secondary">
        Trigger
      </Button>
    }
    trigger="click"
  >
    <MenuButton title="Item A">Item A</MenuButton>
    <MenuButton title="Item B">Item B</MenuButton>
    <MenuButton title="Item C">Item C</MenuButton>
  </Menu>
);

export const Link = () => (
  <Menu
    position="right"
    target={
      <Button variant="outline" color="secondary">
        Trigger
      </Button>
    }
    trigger="click"
  >
    <MenuButton href="#">Item A</MenuButton>
    <MenuButton href="#">Item B</MenuButton>
    <MenuButton href="#">Item C</MenuButton>
  </Menu>
);

export default MenuStory;
