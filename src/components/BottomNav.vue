<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";

const { locale } = useI18n();

const changeLanguage = (lang: string) => {
  locale.value = lang;
};
</script>

<template>
  <nav class="mobile-navbar">
    <section class="title-section">
      <h1>Camel UP</h1>
    </section>

    <section class="router-section">
      <RouterLink to="/" class="nav-item">
        <Icon icon="lucide:house" />
      </RouterLink>

      <RouterLink to="/about" class="nav-item">
        <Icon icon="lucide:info" />
      </RouterLink>
    </section>

    <section class="language-selector">
      <Icon icon="lucide:languages" />

      <select :value="locale" @change="changeLanguage(($event.target as HTMLSelectElement).value)">
        <option value="es">ES</option>
        <option value="en">EN</option>
        <option value="de">DE</option>
      </select>
    </section>
  </nav>
</template>

<style scoped>
.mobile-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  max-height: 10vh;
  padding: var(--space-md) var(--space-5xl);
  background: var(--color-primary);
  color: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.title-section h1 {
  font-size: var(--font-size-xl);
  color: var(--color-surface);
}

.router-section {
  display: flex;
  align-items: center;
  gap: var(--space-5xl);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: inherit;
  opacity: .8;
  transition: var(--transition-fast);
}

.nav-item:hover,
.router-link-active {
  opacity: 1;
}

.nav-item svg {
  font-size: var(--font-size-xl);
}

.language-selector {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.language-selector svg {
  font-size: var(--font-size-lg);
}

.language-selector select {
  padding: var(--space-sm) var(--space-md);
  border: var(--border-width) solid rgb(255 255 255 / .25);
  border-radius: var(--radius-sm);
  background: rgb(255 255 255 / .15);
  color: inherit;
  cursor: pointer;
}

.language-selector select:focus {
  outline: none;
  border-color: rgb(255 255 255 / .5);
}

@media (max-width: 640px) {
  .mobile-navbar {
    padding: var(--space-sm) var(--space-md);
  }

  .title-section h1 {
    font-size: var(--font-size-lg);
  }

  .router-section {
    gap: var(--space-3xl);
  }

  .nav-item {
    gap: var(--space-xs);
    font-size: var(--font-size-sm);
  }

  .nav-item svg {
    font-size: var(--font-size-lg);
  }

  .language-selector {
    gap: var(--space-xs);
  }

  .language-selector svg {
    font-size: var(--font-size-md);
  }

  .language-selector select {
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-sm);
  }
}
</style>
