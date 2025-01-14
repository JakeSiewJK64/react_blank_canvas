import { Children, ReactElement } from "react";
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
    <div className="flex flex-row">
      {items.map((item, index) => (
        <>
          {item}
          <span className="mx-1">
            {index !== items.length - 1 ? separator : ""}
          </span>
        </>
      ))}
    </div>
  );
};
