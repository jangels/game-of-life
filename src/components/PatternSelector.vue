<script setup lang="ts">
import { computed } from 'vue'
import { useGameState } from '../composables/useGameState'
import { PATTERNS } from '../engine/patterns'

const { selectedPattern } = useGameState()

const categories = computed(() => {
  const map = new Map<string, typeof PATTERNS>()
  for (const p of PATTERNS) {
    if (!map.has(p.category)) map.set(p.category, [])
    map.get(p.category)!.push(p)
  }
  return map
})

function selectPattern(p: typeof PATTERNS[number]) {
  selectedPattern.value = selectedPattern.value?.name === p.name ? null : p
}

function cancelSelection() {
  selectedPattern.value = null
}
</script>

<template>
  <div class="pattern-selector">
    <label>Patterns</label>
    <div v-if="selectedPattern" class="active-pattern">
      <span class="active-name">{{ selectedPattern.name }}</span>
      <button class="cancel-btn" @click="cancelSelection">✕</button>
    </div>
    <div v-if="selectedPattern" class="hint">Click on the grid to place</div>
    <div class="categories">
      <div v-for="[category, patterns] in categories" :key="category" class="category">
        <div class="category-name">{{ category }}</div>
        <div class="pattern-list">
          <button
            v-for="p in patterns"
            :key="p.name"
            :class="{ selected: selectedPattern?.name === p.name }"
            :title="p.description"
            @click="selectPattern(p)"
          >
            {{ p.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pattern-selector {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.active-pattern {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--accent-dim);
  border-radius: 4px;
  padding: 4px 8px;
}

.active-name {
  color: var(--accent);
  font-size: 12px;
  font-weight: bold;
}

.cancel-btn {
  padding: 2px 6px;
  font-size: 11px;
  border: none;
  background: transparent;
  color: var(--text-muted);
}

.cancel-btn:hover {
  color: var(--danger);
  background: transparent;
}

.hint {
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  max-height: 400px;
}

.category-name {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.pattern-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pattern-list button {
  text-align: left;
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid transparent;
}

.pattern-list button.selected {
  border-color: var(--accent-dim);
  background: rgba(0, 255, 136, 0.1);
  color: var(--accent);
}
</style>
