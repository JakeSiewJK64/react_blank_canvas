import { cn } from "../../utils";
import "../../index.css";

export const Highlight = ({
  target,
  children,
}: {
  target: string;
  children: string;
}) => {
  if (!target) return <span>{children}</span>;

  const parts = children.split(new RegExp(`(${target})`, "gi"));

  return (
    <div>
      {parts.map((part, index) => (
        <span
          key={index}
          className={cn(
            `${part.toLowerCase() === target.toLowerCase() && "bg-yellow-300"}`
          )}
        >
          {part}
        </span>
      ))}
    </div>
  );
};
