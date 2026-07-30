<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
import { useLogs } from "@/composables/useLogs";
import { Icon } from "@iconify/vue";

const { logs } = useLogs();

const isOpen = ref(false);
const terminalRef = ref<HTMLElement | null>(null);

const command = ref("");

function toggleTerminal() {
  isOpen.value = !isOpen.value;
}

function executeCommand() {}

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
  <button v-if="!isOpen" class="terminal-button" @click="toggleTerminal"><Icon class="button-icon" icon="lucide:square-chevron-right" /></button>

  <div v-if="isOpen" class="terminal">
    <header class="terminal-header">
      <span>Console</span>

      <button class="terminal-btn" @click="closeTerminal">✕</button>
    </header>

    <div ref="terminalRef" class="terminal-body">
      <div
        v-for="log in logs"
        :key="log.id"
        :class="[
          'log-line',
          {
            error: log.type === 'ERROR',
            info: log.type === 'INFO',
            success: log.type === 'SUCCESS',
            warning: log.type === 'WARNING',
            log: log.type === 'STARTED' || log.type === 'FINISHED' || log.type === 'LOG',
          },
        ]"
      >
        [{{ log.type }}] {{ log.message }}
      </div>
    </div>

    <div class="terminal-input-wrapper">
      <input
        class="terminal-input"
        v-model="command"
        type="text"
        placeholder="Enter command..."
        @keyup.enter="executeCommand"
      />

      <button class="terminal-send-button" @click="executeCommand">></button>
    </div>
  </div>
</template>

<style>
.terminal-button {
  position: fixed;
  top: 10px;
  left: 10px;

  width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;

  background: #222;
  color: var(--color-primary-text);

  font-size: 24px;

  cursor: pointer;

  box-shadow: var(--shadow-md);

  transition: var(--transition-fast);
}

.button-icon {
  width: 16px;
  height: 16px;
}

.terminal {
  position: fixed;
  top: 20px;
  left: 20px;

  display: flex;
  flex-direction: column;

  width: 500px;
  height: 300px;

  background: #111;
  color: var(--color-primary-text);

  border-radius: 8px;
  overflow: hidden;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: #222;
}

.terminal-btn {
  background-color: var(--color-danger);
  color: var(--color-primary-text);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 300%;
}

.terminal-body {
  flex: 1;
  overflow-y: auto;
  padding: 10px;

  font-family: monospace;
  font-size: 13px;
}

.terminal-input-wrapper {
  display: flex;
}

.terminal-input {
  width: 100%;
  border-top: 1px solid var(--color-primary-text);
  background-color: #222;
  color: var(--color-primary-text);
}

.terminal-send-button {
  background-color: var(--color-danger);
  width: 2rem;
  color: var(--color-primary-text);
}

.log-line {
  margin-bottom: 4px;
  color: var(--color-primary-text);
}

.log-line {
  margin-bottom: 4px;
}

.log,
.started,
.finished {
  color: var(--color-primary-text);
}

.info {
  color: var(--color-info);
}

.success {
  color: var(--color-success);
}

.warning {
  color: var(--color-warning);
}

.error {
  color: var(--color-danger);
}
</style>
