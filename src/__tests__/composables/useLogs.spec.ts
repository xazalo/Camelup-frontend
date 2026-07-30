import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import { useLogs } from "../../composables/useLogs";

const logs = ref([]);

const addLogs = vi.fn();
const clearLogs = vi.fn();

vi.mock("pinia", () => ({
  storeToRefs: () => ({
    logs,
  }),
}));

vi.mock("@/stores/logs", () => ({
  useLogsStore: () => ({
    addLogs,
    clearLogs,
  }),
}));

describe("useLogs", () => {
  beforeEach(() => {
    addLogs.mockClear();
    clearLogs.mockClear();
    logs.value = [];
  });

  it("returns the logs ref", () => {
    const composable = useLogs();

    expect(composable.logs).toBe(logs);
  });

  it("calls addLogs on the store", () => {
    const { addLogs: add } = useLogs();

    const parsedLogs = [
      {
        type: "INFO",
        message: "game.started",
      },
    ];

    add(parsedLogs as never);

    expect(addLogs).toHaveBeenCalledTimes(1);
    expect(addLogs).toHaveBeenCalledWith(parsedLogs);
  });

  it("calls clearLogs on the store", () => {
    const { clearLogs: clear } = useLogs();

    clear();

    expect(clearLogs).toHaveBeenCalledTimes(1);
  });
});