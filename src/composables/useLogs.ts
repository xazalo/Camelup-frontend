// composables/useLogs.ts

import { storeToRefs } from "pinia";
import { useLogsStore } from "@/stores/logs";
import type { ParsedLog } from "@/utils/logsParser";

export function useLogs() {
  const store = useLogsStore();

  const { logs } = storeToRefs(store);

  function addLogs(
    logs: ParsedLog[],
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