<script setup lang="ts">
import { computed } from 'vue'
import { useGameState } from '../composables/useGameState'

const { generation, aliveCount, density, growthRate, theme } = useGameState()

const isMatrix = computed(() => theme.value === 'matrix')

const densityPercent = computed(() => (density.value * 100).toFixed(1))

const growthDisplay = computed(() => {
  const rate = growthRate.value
  const sign = rate > 0 ? '+' : ''
  return `${sign}${rate.toFixed(1)}%`
})

const growthClass = computed(() => {
  const rate = growthRate.value
  if (rate > 0) return isMatrix.value ? 'growth-up-matrix' : 'growth-up'
  if (rate < 0) return isMatrix.value ? 'growth-down-matrix' : 'growth-down'
  return ''
})
</script>

<template>
  <div class="stats-panel" :class="{ 'stats-panel-matrix': isMatrix }">
    <div class="stat-item">
      <span class="stat-label">{{ isMatrix ? 'GEN::' : '世代' }}</span>
      <span class="stat-value">{{ generation }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">{{ isMatrix ? 'ALIVE::' : '存活' }}</span>
      <span class="stat-value">{{ aliveCount }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">{{ isMatrix ? 'DENSITY::' : '密度' }}</span>
      <span class="stat-value">{{ densityPercent }}%</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">{{ isMatrix ? 'GROWTH::' : '增长' }}</span>
      <span class="stat-value" :class="growthClass">{{ growthDisplay }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats-panel {
  display: flex;
  gap: 20px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  font-variant-numeric: tabular-nums;
}

.stats-panel-matrix {
  background: transparent;
  border: 1px solid #1a3a1a;
  border-radius: 2px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 60px;
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stats-panel-matrix .stat-label {
  font-family: 'Courier New', Courier, monospace;
  color: #3a6a3a;
  font-size: 10px;
  letter-spacing: 1px;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.stats-panel-matrix .stat-value {
  font-family: 'Courier New', Courier, monospace;
  color: #00ff41;
  font-size: 14px;
  text-shadow: 0 0 6px rgba(0, 255, 65, 0.3);
}

.growth-up {
  color: #10b981;
}

.growth-down {
  color: #ef4444;
}

.growth-up-matrix {
  color: #00ff41 !important;
  text-shadow: 0 0 8px rgba(0, 255, 65, 0.5) !important;
}

.growth-down-matrix {
  color: #ff4444 !important;
  text-shadow: 0 0 8px rgba(255, 68, 68, 0.5) !important;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .stats-panel {
    gap: 16px;
    padding: 10px 16px;
    flex-wrap: nowrap;
    justify-content: center;
    width: 100%;
  }

  .stats-panel-matrix {
    padding: 10px 12px;
  }

  .stat-item {
    min-width: 55px;
    flex: 1;
    max-width: 80px;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-value {
    font-size: 15px;
  }

  .stats-panel-matrix .stat-label {
    font-size: 10px;
  }

  .stats-panel-matrix .stat-value {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .stats-panel {
    gap: 8px;
    padding: 8px 10px;
  }

  .stats-panel-matrix {
    padding: 8px 6px;
    gap: 6px;
  }

  .stat-item {
    min-width: 48px;
    max-width: 70px;
  }

  .stat-label {
    font-size: 10px;
    letter-spacing: 0;
  }

  .stat-value {
    font-size: 14px;
  }

  .stats-panel-matrix .stat-label {
    font-size: 8px;
  }

  .stats-panel-matrix .stat-value {
    font-size: 11px;
  }
}
</style>
