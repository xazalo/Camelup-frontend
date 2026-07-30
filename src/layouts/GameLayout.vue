<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";

const isPortrait = ref(false);

function updateOrientation() {
  isPortrait.value = window.innerHeight > window.innerWidth;
}

onMounted(() => {
  updateOrientation();

  window.addEventListener("resize", updateOrientation);
  window.addEventListener("orientationchange", updateOrientation);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateOrientation);
  window.removeEventListener("orientationchange", updateOrientation);
});
</script>

<template>
  <div class="default-layout">
    <div v-if="isPortrait" class="rotate-screen">
      <div class="rotate-content">
        <div class="rotate-icon">📱↻</div>
        <h2>{{ $t("rotate.title") }}</h2>
        <p>{{ $t("rotate.description") }}</p>
      </div>
    </div>

    <main v-else class="main-container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.default-layout {
  width: 100vw;
  height: 100vh;
}

.main-container {
  width: 100%;
  height: 100%;
}

.rotate-screen {
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #111;
  color: var(--color-primary-text);

  z-index: 99999;
}

.rotate-content {
  text-align: center;
}

.rotate-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: rotateHint 1.8s infinite ease-in-out;
}

@keyframes rotateHint {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(90deg);
  }

  75% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>