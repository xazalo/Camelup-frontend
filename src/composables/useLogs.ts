// composables/useLogs.ts

import { storeToRefs } from "pinia";
import { useLogsStore } from "@/stores/logs";

export function useLogs() {
  const store = useLogsStore();

  const { logs } = storeToRefs(store);

  function addLogs(
    logs: {
      type: "LOG" | "ERROR" | "STARTED" | "FINISHED";
      message: string;
    }[],
  ) {
    store.addLogs(logs);
  }

  function clearLogs() {
    store.clearLogs();
  }

  return {
    logs,
    addLogs,
    clearLogs,
  };
}