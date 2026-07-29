<script setup lang="ts">
import { onMounted } from "vue";
import type { Toast } from "@/stores/toast";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  toast: Toast;
}>();

const emit = defineEmits<{
  remove: [id: number];
}>();

onMounted(() => {
  setTimeout(() => {
    emit("remove", props.toast.id);
  }, props.toast.duration ?? 3000);
});
</script>

<template>
  <article class="toast" :class="`toast-${toast.type}`">
    {{ $t(toast.message) }}
  </article>
</template>

<style scoped>
.toast {
  padding: var(--space-lg) var(--space-xl);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  animation: slide-in 0.2s ease-out;
}

.toast-success {
  border-left: 4px solid green;
}

.toast-error {
  border-left: 4px solid red;
}

.toast-warning {
  border-left: 4px solid orange;
}

.toast-info {
  border-left: 4px solid blue;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>