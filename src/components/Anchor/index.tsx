import { HTMLProps } from "react";
import "../../index.css";

/** Standard anchor tag with tailwind styling */
export const Anchor = ({ ...props }: HTMLProps<HTMLAnchorElement>) => {
  return (
    <a
      {...props}
      className={`underline text-blue-600 hover:text-blue-800 visited:text-purple-600 ${props.className}`}
    />
  );
};
