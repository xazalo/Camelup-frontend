import { useToastStore } from "@/stores/toast";
import type { ParsedLog } from "@/utils/logsParser";
import { getLogMessageKey } from "@/utils/getLogMessage";

export const useToast = () => {
  const toastStore = useToastStore();

  const show = (log: ParsedLog, duration?: number) => {
    switch (log.type) {
      case "SUCCESS":
        toastStore.add(getLogMessageKey(log.message), "success", duration);
        break;

      case "ERROR":
        toastStore.add(getLogMessageKey(log.message), "error", duration);
        break;

      case "WARNING":
        toastStore.add(getLogMessageKey(log.message), "warning", duration);
        break;

      case "INFO":
        toastStore.add(getLogMessageKey(log.message), "info", duration);
        break;

      default:
        break;
    }
  };

  return {
    show,
  };
};
