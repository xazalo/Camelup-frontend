import { useToastStore } from "@/stores/toast";
import type { ParsedLog } from "@/utils/logsParser";

export const useToast = () => {
  const toastStore = useToastStore();

  const show = (log: ParsedLog, duration?: number) => {
    switch (log.type) {
      case "SUCCESS":
        toastStore.add(log.message, "success", duration);
        break;

      case "ERROR":
        toastStore.add(log.message, "error", duration);
        break;

      case "WARNING":
        toastStore.add(log.message, "warning", duration);
        break;

      case "INFO":
        toastStore.add(log.message, "info", duration);
        break;

      default:
        break;
    }
  };

  return {
    show,
  };
};