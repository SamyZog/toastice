import * as React from "react";
import { emit, subscribe } from "../../utils/eventManager";
import type {
  Show,
  Clear,
  Dismiss,
  Update,
  Queue,
} from "../../utils/eventManager/eventManager.types";
import ToasticeList from "../ToasticeList";
import type { ToasticeContainerProps, ToasticeListProps } from "./ToasticeContainer.types";

const ToasticeContainer = ({
  newestOnTop,
  margin,
  position,
  limit,
  compact,
  ...props
}: ToasticeContainerProps) => {
  const [toastices, setToastices] = React.useState<ToasticeListProps>([]);
  const toasticesRef = React.useRef<ToasticeListProps>([]);
  const queue = React.useRef<ToasticeListProps>([]);

  React.useEffect(() => {
    toasticesRef.current = toastices;
  }, [toastices]);

  React.useEffect(() => {
    const showToastice: Show = (settings) => {
      let correctPosition = settings.position || position;

      if (compact) {
        if (correctPosition === "top-left" || correctPosition === "top-right") {
          correctPosition = "top-center";
        } else if (correctPosition === "bottom-left" || correctPosition === "bottom-right") {
          correctPosition = "bottom-center";
        }
      }

      const newOption = {
        newestOnTop,
        margin,
        ...props,
        ...settings,
        position: correctPosition,
        compact,
      };

      setTimeout(() => {
        setToastices((curr) => {
          if (curr.some((toastice) => toastice.id === settings.id)) return curr;

          if (typeof limit === "number" && limit > 0) {
            const newArray = curr.filter((toast) => toast.position === newOption.position);

            if (newArray.length >= limit) {
              queue.current = [...queue.current, newOption];

              return curr;
            }
          }

          return newestOnTop ? [newOption, ...curr] : [...curr, newOption];
        });
      }, settings.delay || 0);
    };

    const clearToastice: Clear = (id) => {
      setToastices((curr) => curr.filter((toastice) => toastice.id !== id));
    };

    const dismissToastice: Dismiss = (id) => {
      const activeToastices = toasticesRef.current;

      if (id) {
        activeToastices.forEach((toastice) => {
          if (id === toastice.id) {
            emit("animateout", id);
          }
        });

        return;
      }

      activeToastices.forEach((toastice) => {
        emit("animateout", toastice.id);
      });
    };

    const updateToastice: Update = (id, newSettings) => {
      setToastices((curr) => curr.map((toastice) => {
        if (id === toastice.id) return { ...toastice, ...newSettings };

        return toastice;
      }));
    };

    const queueToastice: Queue = (pos) => {
      if (queue.current.length === 0) return;

      const firstInQueue = queue.current.find((toast) => toast.position === pos);

      queue.current = queue.current.filter((toast) => toast.id !== firstInQueue?.id);

      if (firstInQueue) showToastice(firstInQueue);
    };

    const unsubscribeShow = subscribe("show", showToastice);
    const unsubscribeClear = subscribe("clear", clearToastice);
    const unsubscribeDismiss = subscribe("dismiss", dismissToastice);
    const unsubscribeUpdate = subscribe("update", updateToastice);
    const unsubscribeQueue = subscribe("queue", queueToastice);

    return () => {
      unsubscribeShow();
      unsubscribeDismiss();
      unsubscribeUpdate();
      unsubscribeClear();
      unsubscribeQueue();
    };
  }, [compact, limit, margin, newestOnTop, position, props]);

  return (
    <>
      <ToasticeList
        toastices={toastices}
        margin={margin}
        position="top-left"
        compact={compact}
      />
      <ToasticeList
        toastices={toastices}
        margin={margin}
        position="top-center"
        compact={compact}
      />
      <ToasticeList
        toastices={toastices}
        margin={margin}
        position="top-right"
        compact={compact}
      />
      <ToasticeList
        toastices={toastices}
        margin={margin}
        position="bottom-left"
        compact={compact}
      />
      <ToasticeList
        toastices={toastices}
        margin={margin}
        position="bottom-center"
        compact={compact}
      />
      <ToasticeList
        toastices={toastices}
        margin={margin}
        position="bottom-right"
        compact={compact}
      />
    </>
  );
};

export default ToasticeContainer;

ToasticeContainer.defaultProps = {
  type: "default",
  theme: "filled",
  animation: "pop",
  autoClose: 5000,
  closeOnClick: true,
  limit: 3,
  margin: "normal",
  newestOnTop: false,
  pauseOnHover: true,
  position: "bottom-right",
  showCloseButton: true,
  showIcon: true,
  role: "alert",
  elevated: true,
} as ToasticeContainerProps;
