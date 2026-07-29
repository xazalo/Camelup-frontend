import { useToastStore } from "@/stores/toast";

export const useToast = () => {
  const toastStore = useToastStore();

  const success = (message: string, duration?: number) => {
    toastStore.add(message, "success", duration);
  };

  const error = (message: string, duration?: number) => {
    toastStore.add(message, "error", duration);
  };

  const info = (message: string, duration?: number) => {
    toastStore.add(message, "info", duration);
  };

  const warning = (message: string, duration?: number) => {
    toastStore.add(message, "warning", duration);
  };

  const remove = (id: number) => {
    toastStore.remove(id);
  };

  return {
    success,
    error,
    info,
    warning,
    remove,
  };
};