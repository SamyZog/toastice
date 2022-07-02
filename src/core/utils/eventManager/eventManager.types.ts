import type {
  ToasticeId,
  ToasticePropsWithContent,
} from "../../components/Toastice/Toastice.types";

export type Show = (settings: ToasticePropsWithContent) => void;
export type Dismiss = (id?: ToasticeId) => void;
export type Update = (id: ToasticeId, settings?: Omit<ToasticePropsWithContent, "id">) => void;
export type Clear = (id: ToasticeId) => void;
export type AnimateOut = (id: ToasticeId) => void;
export type Queue = (position: ToasticePropsWithContent["position"]) => void;

export type Events = "show" | "dismiss" | "update" | "clear" | "animateout" | "queue";

export type Callbacks = {
  show: Show;
  dismiss: Dismiss;
  update: Update;
  clear: Clear;
  animateout: AnimateOut;
  queue: Queue;
}

export type Args = {
  show: Parameters<Show>;
  dismiss: Parameters<Dismiss>;
  update: Parameters<Update>;
  clear: Parameters<Clear>;
  animateout: Parameters<AnimateOut>;
  queue: Parameters<Queue>;
}

export type EventBus = Record<Events, Set<Show | Dismiss | Update | Clear | AnimateOut | Queue>>;
