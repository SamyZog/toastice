import type { ToasticePropsWithContent } from "../Toastice/Toastice.types";
import type { ToasticeContainerProps } from "../ToasticeContainer/ToasticeContainer.types";

export type ToasticeListProps = {
  position: ToasticeContainerProps["position"];
  margin: ToasticeContainerProps["margin"];
  toastices: ToasticePropsWithContent[];
  compact?: ToasticeContainerProps["compact"];
};
