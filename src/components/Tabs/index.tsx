import { ReactElement, useState } from "react";
import { Button } from "../Button";
import { Group } from "../Group";
import { Stack } from "../Stack";
import "../../index.css";

export const Tabs = ({
  children,
  tabList,
  border = true,
}: {
  border?: boolean;
  children: ReactElement[];
  tabList: { label: string; id: string }[];
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
            key={`${tab.id}-${tab.label}`}
            className="hover:bg-slate-100 bg-transparent text-black cursor-pointer rounded-none border-b-2 border-kt-6"
            onClick={() => {
              setActive(tab.id);
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
