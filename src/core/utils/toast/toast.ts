import { nanoid } from "nanoid";
import type { ToasticeId } from "../../components/Toastice/Toastice.types";
import { emit } from "../eventManager";
import type { Toast } from "./toast.types";

const toast: Toast = (content, settings) => {
  const id = settings?.id || nanoid(10);

  emit("show", { id, content, ...settings });

  return id;
};

toast.dismiss = (id?: ToasticeId) => {
  emit("dismiss", id);
};

toast.update = (id, settings) => {
  emit("update", id, settings);
};

export default toast;
