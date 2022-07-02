import type {
  ToasticeContent,
  ToasticeId,
  ToasticeProps,
} from "../../components/Toastice/Toastice.types";
import type { Dismiss, Update } from "../eventManager/eventManager.types";

export type Toast = {
  (content: ToasticeContent, settings?: ToasticeProps): ToasticeId;
  dismiss: Dismiss;
  update: Update;
}
