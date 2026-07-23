<template>
  <section class="menu-container">
    <div class="menu-header">
      <span class="badge">🎲 {{ $t('homeHero.badge') }}</span>

      <h2>{{ $t('homeHero.title') }}</h2>

      <p class="subtitle">
        {{ $t('homeHero.subtitle') }}
      </p>

      <div class="hero-features">
        <div class="feature">
          🐪 {{ $t('homeHero.features.stack') }}
        </div>
        <div class="feature">
          🎲 {{ $t('homeHero.features.multiplayer') }}
        </div>
        <div class="feature">
          💰 {{ $t('homeHero.features.bets') }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: var(--space-2xl) var(--space-3xl);
  gap: var(--space-3xl);
}

.menu-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-xl);
}

.badge {
  background: var(--color-surface-alt);
  color: var(--color-secondary);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  border: var(--border-width) solid var(--color-border);
}

.menu-header h2 {
  margin: 0;
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  letter-spacing: -0.03em;
}

.subtitle {
  max-width: 34ch;
  color: var(--color-text-muted);
  line-height: var(--line-height-relaxed);
}

.hero-features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-lg);
  margin-top: var(--space-sm);
}

.feature {
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-lg);
  background: var(--color-surface-alt);
  border: var(--border-width) solid var(--color-border);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.menu-card {
  padding: var(--space-2xl);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
}

@media (max-width: 768px), (max-height: 500px) and (orientation: landscape) {
  .hero-features {
    display: none;
  }
}
</style>