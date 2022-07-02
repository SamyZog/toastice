import type { ToasticeContainerProps } from "../ToasticeContainer/ToasticeContainer.types";

export type ToasticeContent = number | string;

export type ToasticeProps = Omit<ToasticeContainerProps, "limit" | "margin" | "newestOnTop"> & {
  id?: number | string;
  onClose?: () => void;
  onOpen?: (params: ToasticePropsWithContent) => void;
  delay?: number;
  onProgress?: (progress: number) => void;
}

export type ToasticeId = ToasticeProps["id"]

export type ToasticePropsWithContent = ToasticeProps & { content?: ToasticeContent }
