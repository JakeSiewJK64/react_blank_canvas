import { ReactElement } from "react";
import { Popover, PopoverPosition } from "../Popover";
import { Stack } from "../Stack";
import { Button, ButtonProps } from "../Button";
import { Anchor } from "../Anchor";

export const MenuButton = (props: ButtonProps & { href?: string }) => {
  if (props.href) {
    const { href, children } = props;

    return (
      <Anchor
        className="text-left ps-2 text-slate-600 no-underline py-1 hover:bg-slate-100 hover:text-slate-600"
        href={href}
      >
        {children}
      </Anchor>
    );
  }

  return (
    <Button
      {...props}
      className="rounded-none border-none text-slate-600 hover:bg-slate-100"
      variant="outline"
      color="secondary"
    />
  );
};

export const Menu = ({
  children,
  trigger,
  target,
  position,
}: {
  position: PopoverPosition;
  trigger: "click" | "hover";
  children: ReactElement | ReactElement[];
  target: ReactElement;
}) => {
  return (
    <Popover
      content={<Stack className="p-1">{children}</Stack>}
      trigger={trigger}
      position={position}
    >
      {target}
    </Popover>
  );
};
