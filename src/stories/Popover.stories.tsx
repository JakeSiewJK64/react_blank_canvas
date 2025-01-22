import { Meta } from "@storybook/react/*";
import { Popover, PopoverPosition } from "../components/Popover";
import "../index.css";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

const PopoverStory: Meta<typeof Popover> = {
  title: "Core/Popover",
  component: Popover,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

export const Regular = ({
  position = "right",
  trigger = "hover",
  children = "Trigger Button",
}: {
  trigger: "click" | "hover";
  position: PopoverPosition;
  children: string;
}) => {
  return (
    <Popover
      trigger={trigger}
      position={position}
      content={
        <Card>
          <Popover
            trigger={trigger}
            position={position}
            content={
              <Card>
                <Popover
                  trigger={trigger}
                  position={position}
                  content={<Card>I am a content</Card>}
                >
                  <Button>{children}</Button>
                </Popover>
              </Card>
            }
          >
            <Button>{children}</Button>
          </Popover>
        </Card>
      }
    >
      <Button>{children}</Button>
    </Popover>
  );
};

export default PopoverStory;
