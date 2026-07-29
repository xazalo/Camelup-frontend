import { defineStore } from "pinia";
import { ref } from "vue";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<Toast[]>([]);

  const add = (
    message: string,
    type: ToastType = "info",
    duration = 3000,
  ) => {
    const id = Date.now();

    toasts.value.push({
      id,
      message,
      type,
      duration,
    });

    return id;
  };

  const remove = (id: number) => {
    toasts.value = toasts.value.filter(
      (toast) => toast.id !== id,
    );
  };

  return {
    toasts,
    add,
    remove,
  };
});