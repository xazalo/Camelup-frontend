import type { ParsedLog } from "@/utils/logsParser";
import { defineStore } from "pinia";

export interface AppLog extends ParsedLog {
  id: number;
  timestamp: Date;
}

export const useLogsStore = defineStore("logs", {
  state: () => ({
    logs: [] as AppLog[],
  }),

  actions: {
    addLogs(newLogs: ParsedLog[]) {
      this.logs.push(
        ...newLogs.map((log) => ({
          ...log,
          id: Date.now() + Math.random(),
          timestamp: new Date(),
        })),
      );
    },

    clearLogs() {
      this.logs = [];
    },
  },

  getters: {
    errors: (state) =>
      state.logs.filter((log) => log.type === "ERROR"),
  },
});