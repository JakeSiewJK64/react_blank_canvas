import { ReactElement } from "react";
import "../../index.css";

/** Standard anchor tag with tailwind styling */
export const Anchor = ({
  href,
  children,
}: {
  href: string;
  children: ReactElement | string;
}) => {
  return (
    <a
      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      href={href}
    >
      {children}
    </a>
  );
};
