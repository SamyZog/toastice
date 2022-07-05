import { ReactElement } from "react";
import Icon from "../icons/Icon";
import type { ToasticeContainerProps } from "../ToasticeContainer/ToasticeContainer.types";

export type RenderToasticeProps = ToasticePropsWithContent & {
  progress: number,
  close: () => void
  Icon?: typeof Icon,
}
type RenderCustomToastice = (props: RenderToasticeProps) => ReactElement;
export type ToasticeContent = number | string | RenderCustomToastice;

export type ToasticeProps = Omit<ToasticeContainerProps, "limit" | "margin" | "newestOnTop"> & {
  id?: number | string;
  onClose?: () => void;
  onOpen?: (params: ToasticePropsWithContent) => void;
  delay?: number;
  onProgress?: (progress: number) => void;
}

export type ToasticeId = ToasticeProps["id"]

export type ToasticePropsWithContent = ToasticeProps & { content?: ToasticeContent }
