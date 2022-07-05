import type { ToasticePropsWithContent } from "../Toastice/Toastice.types";

export type ToasticeContainerProps = {
  type?:
  | "default"
  | "info"
  | "success"
  | "error"
  | "warning";
  position?:
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
  theme?:
  | "filled"
  | "outlined"
  | "glass";
  margin?:
  | "normal"
  | "dense";
  animation?:
  | "pop"
  | "fade"
  | "slide";
  pauseOnHover?: boolean;
  showIcon?: boolean;
  closeOnClick?: boolean;
  newestOnTop?: boolean;
  showCloseButton?: boolean;
  autoClose?: number | false;
  limit?: number | false;
  role?: string;
  elevated?: boolean,
  fullWidth?: boolean,
}

export type ToasticeListProps = ToasticePropsWithContent[];
