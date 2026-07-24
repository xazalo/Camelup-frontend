<script setup lang="ts">
import { RouterView } from "vue-router";
import BottomNav from "@/components/nav/BottomNav.vue";
</script>

<template>
  <div class="default-layout">
    <main class="main-container">
      <RouterView />
    </main>

    <BottomNav />
  </div>
</template>

<style scoped>
.default-layout {
  min-height: auto;
  display: flex;
  flex-direction: column;
}

.main-container {
  min-height: 82vh;
  max-width: 100vw;
  display: flex;
  gap: var(--space-5xl);
  margin: var(--space-2xl);
  justify-content: space-around;
}

@media (max-width: 768px) {
  .main-container {
    min-height: auto;
    margin: var(--space-xl);
    gap: var(--space-2xl);
    flex-direction: column;
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .main-container {
    margin: var(--space-md);
    gap: var(--space-xl);
  }
}
</style>
