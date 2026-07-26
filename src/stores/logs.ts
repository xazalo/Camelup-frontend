import { defineStore } from "pinia";

export type LogType = "LOG" | "ERROR" | "STARTED" | "FINISHED";

export interface AppLog {
  id: number;
  type: LogType;
  message: string;
  timestamp: Date;
}

export const useLogsStore = defineStore("logs", {
  state: () => ({
    logs: [] as AppLog[],
  }),

  actions: {
    addLogs(newLogs: Omit<AppLog, "id" | "timestamp">[]) {
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