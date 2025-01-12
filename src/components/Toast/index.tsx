import { createContext, useContext, useEffect, useMemo, useState } from "react";
import "../../index.css";

type ToastContextValue = {
  open: (args: { title: string; message: string; duration?: number }) => void;
  close: (id: number) => void;
};

type ToastProviderProperties = {
  children: React.ReactElement;
};

type ToastType = {
  message: string;
  title: string;
  duration: number;
  id: number;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: ToastProviderProperties) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const openToast = ({
    message,
    title,
    duration = 3000,
  }: {
    title: string;
    message: string;
    duration?: number;
  }) => {
    const newToast = {
      id: Date.now(),
      message,
      title,
      duration,
    };

    setToasts((previous) => [...previous, newToast]);
  };

  const closeToast = (id: number) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  };

  const contextValue = useMemo(() => {
    return {
      open: openToast,
      close: closeToast,
    };
  }, []);

  return (
    <>
      <ToastContext.Provider value={contextValue}>
        {children}
        <div className="absolute right-0 bottom-0">
          {toasts &&
            toasts.map((toast) => {
              return (
                <Toast
                  duration={toast.duration}
                  title={toast.title}
                  key={toast.id}
                  message={toast.message}
                  onClose={() => {
                    closeToast(toast.id);
                  }}
                />
              );
            })}
        </div>
      </ToastContext.Provider>
    </>
  );
};

export const Toast = ({
  onClose = () => {},
  message = "Successfully performed an action.",
  title = "Successs!",
  type = "success",
  duration,
}: {
  /** Durationof the toast */
  duration: number;
  /** Title of the toast */
  title: string;
  /** Message of the toast */
  message: string;
  /** type of the toast */
  type?: "success" | "error" | "warn";
  /** on close callback */
  onClose?: () => void;
}) => {
  const color = {
    warn: "bg-orange-100 border-l-4 border-orange-500 text-orange-700",
    success: "bg-teal-100 border-l-4 border-teal-500 text-teal-700",
    error: "bg-red-100 border-l-4 border-red-500 text-red-700",
  }[type];
  const [expired, setExpired] = useState(false);

  // fade effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setExpired(true);
    }, duration - 1000);

    return () => clearTimeout(timeout);
  }, []);

  // remove toast from context
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`p-4 rounded my-1 mx-1 min-w-[25rem] ${color} ${
        expired ? "animate-fadeOut" : "animate-slideIn"
      }`}
      role="alert"
    >
      <div className="flex flex-row">
        <div className="flex flex-col">
          <p className="font-bold">{title}</p>
          <p>{message}</p>
        </div>
        <button
          onClick={() => {
            onClose();
          }}
          className="my-auto ms-auto mx-6 font-bold"
        >
          X
        </button>
      </div>
    </div>
  );
};
