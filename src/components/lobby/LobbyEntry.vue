<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useLobby } from "@/composables/useLobby";
import { useLobbyStore } from "@/stores/lobby";

const router = useRouter();

const { create, join } = useLobby();

const lobbyStore = useLobbyStore();
const { lobby } = storeToRefs(lobbyStore);

const mode = ref<"create" | "join">("create");

const username = ref("");
const lobbyIp = ref("");

watch(
  lobby,
  (value) => {
    if (value) {
      router.push({ name: "lobby" });
    }
  },
  { immediate: true },
);

const handleCreate = () => {
  if (!username.value) return;
  create(username.value);
};

const handleJoin = () => {
  if (!username.value || !lobbyIp.value) return;
  join(lobbyIp.value, username.value);
};
</script>

<template>
  <section class="menu-container info-section">
    <nav class="lobby-nav">
      <button type="button" :disabled="mode === 'create'" @click="mode = 'create'">
        {{ $t("lobbyEntry.create") }}
      </button>

      <button type="button" :disabled="mode === 'join'" @click="mode = 'join'">
        {{ $t("lobbyEntry.join") }}
      </button>
    </nav>

    <form v-if="mode === 'create'" @submit.prevent="handleCreate">
      <label>
        {{ $t("lobbyEntry.name") }}
      </label>

      <input v-model="username" :placeholder="$t('lobbyEntry.namePlace')" />

      <button type="submit">
        {{ $t("lobbyEntry.createLobby") }}
      </button>
    </form>

    <form v-else @submit.prevent="handleJoin">
      <label>
        {{ $t("lobbyEntry.name") }}
      </label>

      <input v-model="username" :placeholder="$t('lobbyEntry.namePlace')" />

      <label>
        {{ $t("lobbyEntry.code") }}
      </label>

      <input v-model="lobbyIp" placeholder="ABC123" />

      <button type="submit">
        {{ $t("lobbyEntry.enter") }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: var(--space-3xl);
  background-color: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  box-sizing: border-box;
  gap: var(--space-2xl);
}

.menu-container nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  background-color: var(--color-surface-alt);
  padding: var(--space-sm);
  border-radius: var(--radius-lg);
}

.menu-container nav button {
  padding: var(--space-lg) var(--space-xl);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: var(--transition-normal);
}

.menu-container nav button:hover:not(:disabled) {
  color: var(--color-text);
  background-color: rgba(255, 253, 248, 0.5);
}

.menu-container nav button:disabled {
  background-color: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
  cursor: default;
}

.menu-container form {
  height: 45vh;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.menu-container label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: calc(var(--space-sm) * -1);
}

.menu-container input {
  width: 100%;
  padding: var(--space-lg) var(--space-xl);
  font-size: var(--font-size-md);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-sizing: border-box;
  outline: none;
  transition:
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}

.menu-container input::placeholder {
  color: var(--color-text);
  opacity: 0.6;
}

.menu-container input:focus {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(201, 123, 42, 0.15);
}

.menu-container button[type="submit"] {
  margin-top: var(--space-md);
  width: 100%;
  padding: var(--space-lg) var(--space-xl);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-text);
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition:
    background-color var(--transition-normal),
    transform var(--transition-fast),
    box-shadow var(--transition-normal);
}

.menu-container button[type="submit"]:hover {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-lg);
}

.menu-container button[type="submit"]:active {
  background-color: var(--color-primary-active);
  transform: translateY(1px);
}
</style>
