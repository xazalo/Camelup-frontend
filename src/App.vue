<script setup lang="ts">
import { RouterView } from "vue-router";
import CamelTerminal from "./components/terminal/CamelTerminal.vue";
import ToastStack from "./components/toast/ToastStack.vue";
import BsoSongs from "./components/audio/BsoSongs.vue";
import FxSounds from "./components/audio/FxSounds.vue";
</script>

<template>
  <RouterView />
  <CamelTerminal />
  <ToastStack />
  <BsoSongs />
  <FxSounds />
</template>
