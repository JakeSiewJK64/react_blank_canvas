import { ReactElement } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button";
import "../../index.css";

export const Modal = ({
  title = "title",
  showModal,
  children,
  className,
  onClose,
  withFooter = true,
  withCloseButton = true,
  onConfirm = () => {},
  onCancel = () => {},
}: {
  /** classname */
  className?: string;
  /** show or hide modal */
  showModal: boolean;
  /** include footer */
  withFooter?: boolean;
  /** include close button */
  withCloseButton?: boolean;
  /** children to render in the modal */
  children: ReactElement | string;
  /** title of the modal */
  title?: string;
  /** on modal close callback */
  onClose?: () => void;
  /** on modal confirm callback */
  onConfirm?: () => void;
  /** on modal cancel callback */
  onCancel?: () => void;
}) => {
  return (
    <>
      {showModal &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
              onClick={onClose}
            />
            <div
              className={`fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col p-2 z-[9999] justify-evenly shadow-[rgba(0,0,0,0.1)_0px_0px_10px] bg-[white] rounded-xl border-2 border-solid border-[rgb(240,240,240)] ${className}`}
            >
              <div className="flex flex-row justify-between items-baseline">
                <h2 className="text-2xl semi-bold">{title}</h2>
                {withCloseButton && (
                  <Button
                    onClick={onClose}
                    className="bg-transparent font-bold text-slate-300 p-2 ms-auto"
                  >
                    X
                  </Button>
                )}
              </div>
              <div className="items-center">{children}</div>
              {withFooter && (
                <div className="flex flex-row justify-end gap-1">
                  <Button
                    onClick={onCancel}
                    variant="outline"
                    className="bg-transparent text-slate-600 border-slate-300"
                  >
                    Cancel
                  </Button>
                  <Button onClick={onConfirm}>Confirm</Button>
                </div>
              )}
            </div>
          </>,
          document.body
        )}
    </>
  );
};
