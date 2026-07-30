import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../utils/getSongVolume", () => ({
  getFxVolume: vi.fn(() => 0.5),
}));

class AudioMock {
  preload = "";
  volume = 1;
  play = vi.fn().mockResolvedValue(undefined);
  cloneNode = vi.fn(() => new AudioMock());
}

Object.defineProperty(globalThis, "Audio", {
  writable: true,
  value: AudioMock,
});

import { useFx } from "../../composables/useFx";
import { getFxVolume } from "../../utils/getSongVolume";

const getFxVolumeMock = vi.mocked(getFxVolume);

describe("useFx", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const { enabled, volume } = useFx();

    enabled.value = true;
    volume.value = 1;
  });

  it("enables and disables sound effects", () => {
    const { enabled, toggle } = useFx();

    expect(enabled.value).toBe(true);

    toggle();

    expect(enabled.value).toBe(false);

    toggle();

    expect(enabled.value).toBe(true);
  });

  it("clamps the volume between 0 and 1", () => {
    const { volume, setVolume } = useFx();

    setVolume(0.6);
    expect(volume.value).toBe(0.6);

    setVolume(-10);
    expect(volume.value).toBe(0);

    setVolume(10);
    expect(volume.value).toBe(1);
  });

  it("does nothing when sound effects are disabled", () => {
    const { enabled, play } = useFx();

    enabled.value = false;

    expect(() => play("bet")).not.toThrow();
  });

  it("warns when a sound does not exist", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { play } = useFx();

    play("bet");

    expect(warn).toHaveBeenCalled();

    warn.mockRestore();
  });

  it("initializes only once", () => {
    const { init } = useFx();

    expect(() => {
      init();
      init();
    }).not.toThrow();
  });

  it("uses getFxVolume when playing", () => {
    const { play } = useFx();

    play("bet");

    expect(getFxVolumeMock).toHaveBeenCalledWith("bet");
  });
});