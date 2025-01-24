import Monicon from "@monicon/react";
import { Meta } from "@storybook/react";
import { Button } from "../components/Button";
import { Group } from "../components/Group";
import { Stack } from "../components/Stack";

const ButtonStory: Meta<typeof Button> = {
  title: "Core/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const StandardButton = (args: typeof Button) => {
  return <Button {...args}>Button</Button>;
};

export const ButtonVariants = () => {
  return (
    <Stack gap={4}>
      <strong>Primary</strong>
      <Group gap={4}>
        <Button>Button</Button>
        <Button color="secondary">Button</Button>
        <Button color="success">Button</Button>
        <Button color="danger">Button</Button>
      </Group>
      <strong>Outline</strong>
      <Group gap={4}>
        <Button variant="outline">Button</Button>
        <Button variant="outline" color="secondary">
          Button
        </Button>
        <Button variant="outline" color="success">
          Button
        </Button>
        <Button variant="outline" color="danger">
          Button
        </Button>
      </Group>
      <strong>Subtle</strong>
      <Group gap={4}>
        <Button variant="subtle">Button</Button>
        <Button variant="subtle" color="secondary">
          Button
        </Button>
        <Button variant="subtle" color="success">
          Button
        </Button>
        <Button variant="subtle" color="danger">
          Button
        </Button>
      </Group>
      <strong>Buttons with Icon</strong>
      <Group gap={4}>
        <Button icon={<Monicon size={15} name="lucide:trash-2" />}>
          Button
        </Button>
        <Button
          icon={<Monicon size={15} name="lucide:trash-2" />}
          variant="outline"
          color="secondary"
        >
          Button
        </Button>
        <Button
          icon={<Monicon size={15} name="lucide:trash-2" />}
          variant="subtle"
          color="danger"
        >
          Button
        </Button>
      </Group>
      <strong>Icon Buttons</strong>
      <Group gap={4}>
        <Button icon={<Monicon size={15} name="lucide:trash-2" />} />
        <Button
          icon={<Monicon size={15} name="lucide:trash-2" />}
          variant="outline"
          color="secondary"
        />
        <Button
          icon={<Monicon size={15} name="lucide:trash-2" />}
          variant="subtle"
          color="danger"
        />
      </Group>
      <strong>Icon Buttons</strong>
      <Group gap={4}>
        <Button loading>Button</Button>
        <Button loading variant="outline" color="secondary">
          Button
        </Button>
        <Button loading variant="subtle" color="danger">
          Button
        </Button>
        <Button loading variant="subtle" color="success">
          Button
        </Button>
      </Group>
    </Stack>
  );
};

export default ButtonStory;
