import { ReactElement, useEffect, useRef, useState } from "react";
import { cn } from "../../utils";

export type PopoverPosition = "bottom" | "top" | "left" | "right";

/**
 *
 * reference:
 * @see https://dev.to/said7388/how-to-create-a-popover-using-tailwind-css-13kj
 */
export const Popover = ({
  children,
  content,
  trigger = "click",
  position = "bottom",
}: {
  position: PopoverPosition;
  trigger: "click" | "hover";
  content: ReactElement | ReactElement[] | string;
  children: ReactElement | ReactElement[] | string;
}) => {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<any>(null);

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    if (show) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      className="w-fit h-fit relative flex justify-center"
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        hidden={!show}
        className={cn(
          `min-w-fit w-[200px] h-fit absolute ${
            {
              top: "bottom-full mb-1", // Popover above the button
              bottom: "top-full mt-1", // Popover below the button
              left: "right-full mr-1", // Popover to the left of the button
              right: "left-full ml-1", // Popover to the right of the button
            }[position]
          } z-10 transition-all animate-fadeIn`
        )}
      >
        <div className="bg-white border rounded shadow-xl">{content}</div>
      </div>
    </div>
  );
};
