<script setup lang="ts">
import { storeToRefs } from "pinia";

import ToastAlert from "@/components/toast/ToastAlert.vue";
import { useToastStore } from "@/stores/toast";

const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);
</script>

<template>
  <aside class="toast-stack">
    <ToastAlert
      v-for="toast in toasts"
      :key="toast.id"
      :toast="toast"
      @remove="toastStore.remove"
    />
  </aside>
</template>

<style scoped>
.toast-stack {
  position: fixed;
  top: var(--space-xl);
  right: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  z-index: 1000;
}
</style>