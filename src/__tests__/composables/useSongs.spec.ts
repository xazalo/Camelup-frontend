import { describe, it, expect, beforeEach } from "vitest";
import { useSongs } from "../../composables/useSongs";

describe("useSongs", () => {
  beforeEach(() => {
    const { musicEnabled, musicVolume } = useSongs();

    musicEnabled.value = false;
    musicVolume.value = 1;
  });

  it("starts with music disabled", () => {
    const { musicEnabled } = useSongs();

    expect(musicEnabled.value).toBe(false);
  });

  it("starts with full volume", () => {
    const { musicVolume } = useSongs();

    expect(musicVolume.value).toBe(1);
  });

  it("toggles music on", () => {
    const { musicEnabled, toggleMusic } = useSongs();

    toggleMusic();

    expect(musicEnabled.value).toBe(true);
  });

  it("toggles music off", () => {
    const { musicEnabled, toggleMusic } = useSongs();

    musicEnabled.value = true;

    toggleMusic();

    expect(musicEnabled.value).toBe(false);
  });

  it("sets volume", () => {
    const { musicVolume, setMusicVolume } = useSongs();

    setMusicVolume(0.4);

    expect(musicVolume.value).toBe(0.4);
  });

  it("clamps volume above 1", () => {
    const { musicVolume, setMusicVolume } = useSongs();

    setMusicVolume(2);

    expect(musicVolume.value).toBe(1);
  });

  it("clamps volume below 0", () => {
    const { musicVolume, setMusicVolume } = useSongs();

    setMusicVolume(-1);

    expect(musicVolume.value).toBe(0);
  });
});