<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
import { useLogs } from "@/composables/useLogs";

const { logs } = useLogs();

const isOpen = ref(false);
const terminalRef = ref<HTMLElement | null>(null);

function toggleTerminal() {
  isOpen.value = !isOpen.value;
}

function closeTerminal() {
  isOpen.value = false;
}

watch(
  logs,
  async () => {
    await nextTick();

    if (terminalRef.value) {
      terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }
  },
  { deep: true },
);
</script>

<template>
  <button v-if="!isOpen" class="terminal-button" @click="toggleTerminal">Terminal</button>

  <div v-if="isOpen" class="terminal">
    <header class="terminal-header">
      <span>Console</span>

      <button @click="closeTerminal">✕</button>
    </header>

    <div ref="terminalRef" class="terminal-body">
      <div
        v-for="log in logs"
        :key="log.id"
        :class="[
          'log-line',
          {
            error: log.type === 'ERROR',
            info: log.type === 'LOG',
            log: log.type === 'STARTED' || log.type === 'FINISHED',
          },
        ]"
      >
        [{{ log.type }}] {{ log.message }}
      </div>
    </div>
  </div>
</template>

<style>
.terminal-button {
  position: fixed;
  top: 20px;
  left: 20px;
}

.terminal {
  position: fixed;
  top: 20px;
  left: 20px;

  width: 500px;
  height: 300px;

  background: #111;
  color: white;

  border-radius: 8px;
  overflow: hidden;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: #222;
}

.terminal-body {
  height: calc(100% - 40px);
  overflow-y: auto;
  padding: 10px;

  font-family: monospace;
  font-size: 13px;
}

.log-line {
  margin-bottom: 4px;
  color: white;
}

.info {
  color: #4da6ff;
}

.error {
  color: #ff5555;
}

.log {
  color: #fbecec;
}
</style>
