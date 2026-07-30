<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from "vue";
import { useSongs } from "@/composables/useSongs";
import { getSongVolume } from "@/utils/getSongVolume";

const { musicEnabled, musicVolume } = useSongs();

const modules = import.meta.glob("@/assets/songs/*.{mp3,ogg,wav}", {
  eager: true,
  import: "default",
});

const playlist = Object.values(modules) as string[];

let audio: HTMLAudioElement | null = null;
let current = 0;

function shuffle() {
  for (let i = playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const one = playlist[i] as string;
    const two = playlist[j] as string;
    [playlist[i], playlist[j]] = [two, one];
  }
}

async function playSong() {
  if (!audio || playlist.length === 0) return;
  const song = playlist[current] as string;
  const currentVolume = musicVolume.value;
  const songAdjust = getSongVolume(song);

  audio.src = song;
  audio.volume = currentVolume * songAdjust;

  try {
    await audio.play();
  } catch (err) {
    console.error("Song error:", err);
  }
}

function nextSong() {
  current++;

  if (current >= playlist.length) {
    shuffle();
    current = 0;
  }

  playSong();
}

onMounted(() => {
  audio = new Audio();

  audio.preload = "auto";
  audio.loop = false;
  audio.volume = musicVolume.value;

  audio.addEventListener("ended", nextSong);

  shuffle();
});

onBeforeUnmount(() => {
  if (!audio) return;

  audio.pause();
  audio.removeEventListener("ended", nextSong);
});

watch(musicVolume, (value) => {
  if (audio) {
    audio.volume = value;
  }
});

watch(
  musicEnabled,
  (enabled) => {
    if (!audio) return;

    if (enabled) {
      playSong();
    } else {
      audio.pause();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template />
