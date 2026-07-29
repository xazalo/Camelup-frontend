<script setup lang="ts">
import { RouterView } from "vue-router";
import CamelTerminal from "./components/terminal/CamelTerminal.vue";
import ToastStack from "./components/toast/ToastStack.vue";
</script>

<template>
  <RouterView />
  <CamelTerminal />
  <ToastStack />
</template>
