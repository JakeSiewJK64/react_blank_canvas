import { ReactElement, useEffect, useRef, useState } from "react";
import { cn } from "../../utils";

/**
 *
 * reference:
 * @see https://dev.to/said7388/how-to-create-a-popover-using-tailwind-css-13kj
 */
export const ReactPopover = ({
  children,
  content,
  trigger = "click",
  position = "bottom",
}: {
  position: "bottom" | "top" | "left" | "right";
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

  const handleMouseLeft = () => {
    if (trigger === "hover") {
      setShow(false);
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
      onMouseLeave={handleMouseLeft}
      className="w-fit h-fit relative flex justify-center"
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        hidden={!show}
        className={cn(
          `min-w-fit w-[200px] h-fit absolute ${
            {
              top: "bottom-[2rem]",
              bottom: "top-[2rem]",
              left: "right-[2rem]",
              right: "left-[2rem]",
            }[position]
          } z-10 transition-all`
        )}
      >
        <div className="rounded bg-white p-3 shadow-[10px_30px_150px_rgba(46,38,92,0.25)]">
          {content}
        </div>
      </div>
    </div>
  );
};
