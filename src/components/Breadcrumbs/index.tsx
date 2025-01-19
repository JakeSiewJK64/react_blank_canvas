import { Children, ReactElement } from "react";
import { Group } from "../Group";
import "../../index.css";

export const Breadcrumbs = ({
  children,
  separator = "/",
}: {
  children: ReactElement[];
  separator?: string;
}) => {
  const items = Children.toArray(children);
  return (
    <Group>
      {items.map((item, index) => (
        <div key={children.length - index}>
          {item}
          <span className="mx-1">
            {index !== items.length - 1 ? separator : ""}
          </span>
        </div>
      ))}
    </Group>
  );
};
