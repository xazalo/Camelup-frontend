import { describe, it, expect, vi, beforeEach } from "vitest";
import { useToast } from "@/composables/useToast";

const add = vi.fn();

vi.mock("@/stores/toast", () => ({
  useToastStore: () => ({
    add,
  }),
}));

vi.mock("@/utils/getLogMessage", () => ({
  getLogMessageKey: vi.fn((message: string) => `translated.${message}`),
}));

describe("useToast", () => {
  beforeEach(() => {
    add.mockClear();
  });

  it("shows success toast", () => {
    const { show } = useToast();

    show({
      type: "SUCCESS",
      message: "saved",
    });

    expect(add).toHaveBeenCalledWith(
      "translated.saved",
      "success",
      undefined,
    );
  });

  it("shows error toast", () => {
    const { show } = useToast();

    show({
      type: "ERROR",
      message: "oops",
    });

    expect(add).toHaveBeenCalledWith(
      "translated.oops",
      "error",
      undefined,
    );
  });

  it("passes duration", () => {
    const { show } = useToast();

    show(
      {
        type: "INFO",
        message: "hello",
      },
      5000,
    );

    expect(add).toHaveBeenCalledWith(
      "translated.hello",
      "info",
      5000,
    );
  });

  it("ignores unknown type", () => {
    const { show } = useToast();

    show({
      type: "UNKNOWN" as never,
      message: "hello",
    });

    expect(add).not.toHaveBeenCalled();
  });
});