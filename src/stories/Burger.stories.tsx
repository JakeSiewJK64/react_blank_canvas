import { Meta } from "@storybook/react/*";
import { Burger } from "../components/Button";
import "../index.css";

const BurgerStory: Meta<typeof Burger> = {
  title: "Core/Burger",
  component: Burger,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

export const Regular = () => <Burger />;

export default BurgerStory;
