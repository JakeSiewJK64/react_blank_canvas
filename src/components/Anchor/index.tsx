import { ReactElement, ReactNode } from "react";
import "../../index.css";

/** Standard anchor tag with tailwind styling */
export const Anchor = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode | ReactElement | string;
  className?: string;
}) => {
  return (
    <a
      className={`underline text-blue-600 hover:text-blue-800 visited:text-purple-600 ${className}`}
      href={href}
    >
      {children}
    </a>
  );
};
