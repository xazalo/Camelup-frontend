import { getFxVolume } from "@/utils/getSongVolume";

export type FxName =
  | "bet"
  | "game-start"
  | "loser"
  | "place-tile"
  | "roll-dice"
  | "winner"
  | "your-turn";

import { ref } from "vue";

const fxEnabled = ref(true);
const fxVolume = ref(1);

const sounds = new Map<FxName, HTMLAudioElement>();

let initialized = false;

const modules = import.meta.glob("@/assets/fx/*.{mp3,wav,ogg}", {
  eager: true,
  import: "default",
});

function getName(path: string): FxName {
  return (path.split("/").pop() ?? "").replace(
    /\.(mp3|wav|ogg)$/,
    "",
  ) as FxName;
}

export function useFx() {
  function init() {
    if (initialized) return;

    initialized = true;

    Object.entries(modules).forEach(([path, url]) => {
      const audio = new Audio(url as string);

      audio.preload = "auto";

      sounds.set(getName(path), audio);
    });
  }

  function play(name: FxName) {
    if (!fxEnabled.value) return;

    const audio = sounds.get(name);

    if (!audio) {
      console.warn(`FX "${name}" not found.`);
      return;
    }

    const clone = audio.cloneNode() as HTMLAudioElement;

    clone.volume = fxVolume.value * getFxVolume(name);

    clone.play().catch(console.error);
  }

  function toggle() {
    fxEnabled.value = !fxEnabled.value;
  }

  function setVolume(volume: number) {
    fxVolume.value = Math.min(1, Math.max(0, volume));
  }

  return {
    play,
    init,
    toggle,
    setVolume,
    enabled: fxEnabled,
    volume: fxVolume,
  };
}