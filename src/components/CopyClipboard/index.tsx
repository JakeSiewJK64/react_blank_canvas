import Monicon from "@monicon/react";
import { useState, useEffect } from "react";
import { Button } from "../Button";
import { cn } from "../../utils";

export const CopyClipboard = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (clicked) {
        setClicked(false);
      }
    }, 1500);
  }, [clicked]);

  return (
    <Button
      color="secondary"
      variant="outline"
      className={cn(
        `${
          clicked ? "bg-success hover:bg-success hover:opacity-60" : ""
        } ${className}`
      )}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setClicked(true);
      }}
    >
      {clicked ? (
        <Monicon name="lucide:check" color="white" size={15} />
      ) : (
        <Monicon name="lucide:copy" size={15} />
      )}
    </Button>
  );
};
