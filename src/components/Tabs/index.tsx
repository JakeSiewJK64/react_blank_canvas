import { ReactElement, useState } from "react";
import { Button } from "../Button";
import { Group } from "../Group";
import { Stack } from "../Stack";
import { cn } from "../../utils";
import "../../index.css";

export const Tabs = ({
  children,
  tabList,
  border = true,
}: {
  border?: boolean;
  children: ReactElement[];
  tabList: { label: string; key: string }[];
}) => {
  const [active, setActive] = useState(children[0].key);

  return (
    <Stack>
      <Group
        gap={10}
        className={border ? "rounded border border-slate-300 px-2" : ""}
      >
        {tabList.map((tab) => (
          <Button
            key={`${tab.key}-${tab.label}`}
            className={cn(
              `hover:bg-slate-100 bg-transparent text-black cursor-pointer rounded-none border-kt-6 ${
                active === tab.key && "border-b-2"
              }`
            )}
            onClick={() => {
              setActive(tab.key);
            }}
          >
            {tab.label}
          </Button>
        ))}
      </Group>
      {children.filter((child) => child.key === active)}
    </Stack>
  );
};
